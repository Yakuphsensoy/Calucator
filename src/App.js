import { useState } from 'react';
import './App.css';
function App() {
  const [inputValue, setInputValue] = useState('')
  const [mode, setMode] = useState(true)

  function addChar(char) {
    if (mode === false) {
      return addNewChar(char)
    }

    if (
      ['+', '-', '/', '*'].includes(inputValue[inputValue.length - 1])
      && ['+', '-', '/', '*'].includes(char)
      || inputValue.length === 0
      && ['+', '-', '/', '*'].includes(char)
      || inputValue.length === 0
      && char === '0'
      || ['+', '-', '/', '*'].includes(inputValue[inputValue.length - 1])
      && char === '0'
    ) {
      return
    }

    setInputValue(inputValue + char)
  }

  function addNewChar(char) {
    setMode(false)
    setInputValue(char)
  }

  function clear() {
    setInputValue("")
    setMode(true)


  }

  function calculate() {
    let chars = formatInputString(inputValue)
    // [12, '+', 20]
    if (['+', '-', '/', '*'].includes(chars[chars.length - 1]) || chars.length === 1) return

    while (chars.includes('*')) {
      const index = chars.findIndex(char => char === '*')

      chars[index] = chars[index - 1] * chars[index + 1]
      chars[index - 1] = null
      chars[index + 1] = null
      chars = chars.filter(char => !!char)
    }

    while (chars.includes('/')) {
      const index = chars.findIndex(char => char === '/')

      chars[index] = chars[index - 1] / chars[index + 1]
      chars[index - 1] = null
      chars[index + 1] = null
      chars = chars.filter(char => !!char)
    }

    while (chars.includes('+')) {
      const index = chars.findIndex(char => char === '+')

      chars[index] = chars[index - 1] + chars[index + 1]
      chars[index - 1] = null
      chars[index + 1] = null
      chars = chars.filter(char => !!char)
    }

    while (chars.includes('-')) {
      const index = chars.findIndex(char => char === '-')

      chars[index] = chars[index - 1] -
        chars[index + 1]
      chars[index - 1] = null
      chars[index + 1] = null
      chars = chars.filter(char => !!char)
    }

    setInputValue(chars[0])
    setMode(true)
  }

  function formatInputString(inputValue) {
    // Örn: inputValue = '12+4*5' için

    // cur: 1 için
    // { currNumberString: '1', numbers: [] }

    // cur: 2 için
    // { currNumberString: '12', numbers: [] }

    // cur: + için
    // { currNumberString: '', numbers: [12, '+'] }

    // cur: 4 için
    // { currNumberString: '4', numbers: [12, '+'] }

    // cur: * için
    // { currNumberString: '', numbers: [12, '+', 4, '*'] }

    // cur: 5 için
    // { currNumberString: '', numbers: [12, '+', 4, '*', 5] }
    return inputValue.split('').reduce((pre, cur, idx) => {
      if (['+', '-', '/', '*'].includes(cur)) {
        return {
          currNumberString: '',
          numbers: [...pre.numbers, Number(pre.currNumberString), cur]
        }
      }

      if (idx === inputValue.length - 1) {
        return {
          currNumberString: '',
          numbers: [...pre.numbers, Number(pre.currNumberString + cur)]
        }
      }

      return {
        currNumberString: pre.currNumberString + cur,
        numbers: pre.numbers,
      }
    }, { currNumberString: '', numbers: [] }).numbers
  }

  return (
    <div className="App">
      <div className="calucator">
        <div className="result-screen">
          <input
            type="text"
            name="input-screen"
            id="input-sc"
            // onChange={(e) => addChar(e.target.value)}
            value={inputValue}
            readOnly
          />
          <div className="numbers">
            <button onClick={() => addChar('0')}>0</button><br />
            <button onClick={() => addChar('1')}>1</button>
            <button onClick={() => addChar('2')}>2</button>
            <button onClick={() => addChar('3')}>3</button><br />
            <button onClick={() => addChar('4')}>4</button>
            <button onClick={() => addChar('5')}>5</button>
            <button onClick={() => addChar('6')}>6</button><br />
            <button onClick={() => addChar('7')}>7</button>
            <button onClick={() => addChar('8')}>8</button>
            <button onClick={() => addChar('9')}>9</button><br />
            <button onClick={() => addChar('/')}>/</button>
            <button onClick={() => addChar('*')}>*</button>
            <button onClick={() => addChar('-')}>-</button>
            <button onClick={() => addChar('+')}> +</button>
            <button onClick={clear}> CE</button>
            <button onClick={calculate}> Calculate</button>
          </div>
        </div>
      </div >
    </div >
  );
}

export default App;
