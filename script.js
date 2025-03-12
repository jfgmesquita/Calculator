const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector('.display');
    display.value = calculator.displayValue;
}

updateDisplay();

let keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
    let target = event.target;
    if (!target.matches('button')) {
        console.log('Not a button')
        return;
    }
    if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        handleOperator(target.value);
        return;
    }
    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        inputDecimal(target.value);
        return;
    }
    if (target.classList.contains('clear')) {
        console.log('key', target.value);
        resetCalculator();
        return;
    }
    if (target.classList.contains('equals')) {
        console.log('key', target.value);
        handleOperator(target.value);
        return;
    }
    if (target.classList.contains('number')) {
        console.log('digit', target.value);
        inputDigit(target.value);
        return;
    }
});

function inputDigit(digit) {
    let displayValue = calculator.displayValue;
    let waitingForSecondOperand = calculator.waitingForSecondOperand;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}
   
function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += '.';
    }
    updateDisplay();
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    updateDisplay();
}

function handleOperator(operator) {
    const { firstOperand, displayValue, operator: previousOperator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator === '=') {
        if (previousOperator && calculator.waitingForSecondOperand === false) {
            const result = calculation[previousOperator](firstOperand, inputValue);
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
        }
    } else {
        if (firstOperand === null) {
            calculator.firstOperand = inputValue;
        } else if (previousOperator && !calculator.waitingForSecondOperand) {
            const result = calculation[previousOperator](firstOperand, inputValue);
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = operator;
    }

    updateDisplay();
}

let calculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};
