const previousInput = document.querySelector('.previous-input');
const currentInput = document.querySelector('.current-input');
const operator = document.querySelectorAll('#operator');
const number = document.querySelectorAll('#number');
const deleteBtn = document.querySelector('#delete');
const clearAllBtn = document.querySelector('#all-clear');
const dot = document.querySelector('#dot')
const equalBtn = document.querySelector('#equal')
let inputA = '';
let inputB = '';
let operand = null
let result = '';

// click any number, dot or operand puts his value in currentInput

deleteBtn.addEventListener('click', (e) => {
    if (currentInput.textContent !== '') {
        currentInput.textContent = currentInput.textContent.slice(0, -1)
    }
})

equalBtn.addEventListener('click', (e) => {
    if(inputA !== '' && inputB !== '' && operand !== null) {
        if (operand === '/' && inputA === '0') {
            alert("You can't divide by 0!")
            return
          }
        result = operate(operand, inputA, inputB)
        operand = null
        currentInput.textContent = parseFloat(result.toFixed(10))
        previousInput.textContent = ''
        inputA = parseFloat(result.toFixed(10))
    }
})

dot.addEventListener('click', (e) => {
    if (currentInput.textContent.includes('.')) return;
    value = e.target.innerText;
    inputA += value
    currentInput.textContent += value;
})

number.forEach(num => num.addEventListener('click', (e) => {
    value = e.target.innerText;
    inputA += value
    currentInput.textContent += value;
}))

operator.forEach(oper => oper.addEventListener('click', (e) => {
    if(inputA !== '' && inputB !== '' && operand !== null) {
        console.log(inputA)
        if (operand === '/' && inputA === '0') {
            alert("You can't divide by 0!")
            return
          }
        result = roundResult(operate(operand, inputA, inputB))
        operand = null
        currentInput.textContent = result
        previousInput.textContent = ''
        inputA = result
    }    
    if (operand === null) {
        value = e.target.innerText;
        inputB = currentInput.textContent;
        operand = value;
        previousInput.textContent += currentInput.textContent + operand;
        currentInput.textContent = '';
        inputA = currentInput.textContent;
    } else {
        value = e.target.innerText;
        operand = value;
        previousInput.textContent = previousInput.textContent.slice(0, -1) + operand
        currentInput.textContent = '';
        inputA = currentInput.textContent;

    }
}))

// AC button clears all the inputs

clearAllBtn.addEventListener('click', () => {
    previousInput.textContent = '';
    currentInput.textContent = '';
    inputA = '';
    inputB = '';
    operand = null
})

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

function operate(operation, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (operation === '+') {
        return num2 + num1;
    } else if (operation === '-') {
        return num2 - num1;
    } else if (operation === "*") {
        return num2 * num1;
    } else if(operation === '/') {
        return num2 / num1
    }
}