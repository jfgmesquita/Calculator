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
        return;
    }
    if (target.classList.contains('number')) {
        console.log('digit', target.value);
        inputDigit(target.value);
        return;
    }
});

function inputDigit(digit) {
    let waitingForSecondOperand = calculator.waitingForSecondOperand;
    let displayValue = calculator.displayValue;

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
    let displayValue = calculator.displayValue;
    let firstOperand = calculator.firstOperand;
    let inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    }
    
    calculator.waitingForSecondOperand = true;
    calculator.operator = operator;
    updateDisplay();
}
   

