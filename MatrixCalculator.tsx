"use client"

const multiply = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m13.41 12l6.3-6.29a1 1 0 1 0-1.42-1.42L12 10.59l-6.29-6.3a1 1 0 0 0-1.42 1.42l6.3 6.29l-6.3 6.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l6.29-6.3l6.29 6.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"/></svg>;
const sum = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M3.81 3.706a.75.75 0 0 1 .69-.456h11a.75.75 0 0 1 0 1.5H6.262l4.146 4.308a.75.75 0 0 1 .035 1.001L6.104 15.25H15.5a.75.75 0 0 1 0 1.5h-11a.75.75 0 0 1-.575-1.231L8.86 9.613L3.96 4.52a.75.75 0 0 1-.15-.814"/></svg>;
const subtract = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3.996 13H20a1 1 0 1 0 0-2H3.996a1 1 0 1 0 0 2"/></svg>;
const transpose = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M19 26h-5v-2h5a5.006 5.006 0 0 0 5-5v-5h2v5a7.008 7.008 0 0 1-7 7M8 30H4a2.002 2.002 0 0 1-2-2V14a2.002 2.002 0 0 1 2-2h4a2.002 2.002 0 0 1 2 2v14a2.002 2.002 0 0 1-2 2M4 14v14h4V14zm24-4H14a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h14a2.002 2.002 0 0 1 2 2v4a2.002 2.002 0 0 1-2 2M14 4v4h14V4z"/></svg>;

import { useState } from 'react';

interface CalculatorState {
  matrixA: number[][];
  matrixB: number[][];
  resultMatrix: number[][];
}

function MatrixCalculator() {
  const initialSize = 3;

  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    matrixA: Array.from({ length: initialSize }, () => Array(initialSize).fill(0)),
    matrixB: Array.from({ length: initialSize }, () => Array(initialSize).fill(0)),
    resultMatrix: Array.from({ length: initialSize }, () => Array(initialSize).fill(0)),
  });

  function handleMatrixChange(
    matrix: 'matrixA' | 'matrixB',
    row: number,
    col: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = parseFloat(e.target.value);
    setCalculatorState((prev) => {
      const newMatrix = prev[matrix].map((r, rowIndex) =>
        rowIndex === row ? [...r.slice(0, col), isNaN(newValue) ? 0 : newValue, ...r.slice(col + 1)] : r
      );
      return { ...prev, [matrix]: newMatrix };
    });
  }

  function addRow() {
    setCalculatorState((prev) => ({
      ...prev,
      matrixA: [...prev.matrixA, Array(prev.matrixA[0].length).fill(0)],
      matrixB: [...prev.matrixB, Array(prev.matrixB[0].length).fill(0)],
    }));
  }

  function addColumn() {
    setCalculatorState((prev) => ({
      ...prev,
      matrixA: prev.matrixA.map((r) => [...r, 0]),
      matrixB: prev.matrixB.map((r) => [...r, 0]),
    }));
  }

  function multiplyMatrices() {
    const { matrixA, matrixB } = calculatorState;
    const resultMatrix: number[][] = [];

    for (let i = 0; i < matrixA.length; i++) {
      resultMatrix[i] = [];
      for (let j = 0; j < matrixB[0].length; j++) {
        resultMatrix[i][j] = 0;
        for (let k = 0; k < matrixA[0].length; k++) {
          resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }

    setCalculatorState((prev) => ({ ...prev, resultMatrix }));
  }

  function subtractMatrices() {
    const { matrixA, matrixB } = calculatorState;
    const resultMatrix: number[][] = [];

    for (let i = 0; i < matrixA.length; i++) {
      resultMatrix[i] = [];
      for (let j = 0; j < matrixA[0].length; j++) {
        resultMatrix[i][j] = matrixA[i][j] - matrixB[i][j];
      }
    }
    setCalculatorState((prev) => ({ ...prev, resultMatrix }));
  }

  function transposeMatrix(matrix: number[][]): number[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  function transposeMatrixA() {
    setCalculatorState((prev) => ({
      ...prev,
      matrixA: transposeMatrix(prev.matrixA),
    }));
  }

  function transposeMatrixB() {
    setCalculatorState((prev) => ({
      ...prev,
      matrixB: transposeMatrix(prev.matrixB),
    }));
  }

  function performMatrixOperation() {
    const resultMatrix = calculatorState.matrixA.map((row: number[], rowIndex: number) =>
      row.map((element: number, colIndex: number) => element + calculatorState.matrixB[rowIndex][colIndex])
    );
    setCalculatorState((prev) => ({ ...prev, resultMatrix }));
  }

  return (
    <div id="allMat">
      <div>
        <label>Matriz A:</label>
        {calculatorState.matrixA.map((row, rowIndex) => (
          <div className='matrizes' key={rowIndex}>
            {row.map((element, colIndex) => (
              <input
                className='matriz'
                key={colIndex}
                type="number"
                placeholder={element === null ? '' : element.toString()}
                value={element === null ? '' : element}
                onChange={(e) => handleMatrixChange('matrixA', rowIndex, colIndex, e)}
              />
            ))}
          </div>
        ))}
      </div>
      <br />
      <div>
        <label>Matriz B:</label>
        {calculatorState.matrixB.map((row, rowIndex) => (
          <div className='matrizes' key={rowIndex}>
            {row.map((element, colIndex) => (
              <input
                className='matriz'
                key={colIndex}
                type="number"
                placeholder={element === null ? '' : element.toString()}
                value={element === null ? '' : element}
                onChange={(e) => handleMatrixChange('matrixB', rowIndex, colIndex, e)}
              />
            ))}
          </div>
        ))}
      </div>
      <div id="aumentarMatriz">
        <button onClick={addRow}><p>Adicionar Linha</p></button>
        <button onClick={addColumn}><p>Adicionar Coluna</p></button>
      </div>
      <div id="calculadora">
        <button onClick={multiplyMatrices}>{multiply}<p>Multiplicar Matrizes</p></button>
        <button onClick={performMatrixOperation}>{sum}<p>Somar matrizes</p></button>
        <button onClick={subtractMatrices}>{subtract}<p>Subtrair Matrizes</p></button>
        <button onClick={transposeMatrixA}>{transpose}<p>Transpor Matriz A</p></button>
        <button onClick={transposeMatrixB}>{transpose}<p>Transpor Matriz B</p></button>
      </div>
      <div>
        <div id="titleMatrizResultado">
          <h2>Resultado:</h2>
        </div>
        {calculatorState.resultMatrix.map((row, rowIndex) => (
          <div key={rowIndex} className='matrizResultado'>
            {row.map((cell, colIndex) => (
              <div key={colIndex} className='matriz'>{cell}</div>
            ))}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatrixCalculator;
