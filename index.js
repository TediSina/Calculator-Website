const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement  = document.querySelector('[data-current-operand]');
var currentOperand = "";
var previousOperand = "";

function strip(number) {
    return (parseFloat(number).toPrecision(15));
}

function clear() {
    currentOperand = "";
    previousOperand = "";
    previousOperandTextElement.innerText = "";
    currentOperandTextElement.innerText = "";
}

function appendNumber(number) {
    if (number !== ".") {
        currentOperand += number.toString();
    } else {
        var periodCheckResult = periodCountIsZero();
        if (periodCheckResult === true) {
            currentOperand += number.toString();
        }
    }
}

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    previousOperandTextElement.innerText = previousOperand;
}

function removeLastNumber() {
    currentOperand = currentOperand.substring(0, currentOperand.length - 1);
}

function periodCountIsZero() {
    var periodCount = (currentOperand.match(/\./g)||[]).length;
    if (periodCount === 0) {
        return true;
    } else {
        return false;
    }
}

function appendOperation(operation) {
    if (currentOperand !== "") {
        previousOperand = currentOperand;
        currentOperand = "";
        currentOperandTextElement.innerText = "";
        previousOperand += operation.toString();
    }
}

function calculate() {
    var num1 = Number(previousOperand.slice(0, -1));
    var num2 = Number(currentOperand);
    var operation = previousOperand.slice(previousOperand.length - 1);
    if (operation === "+") {
        currentOperand = parseFloat(strip(num1 + num2));
        previousOperand = "";
    } else if (operation === "-") {
        currentOperand = parseFloat(strip(num1 - num2));
        previousOperand = "";
    } else if (operation === "*") {
        currentOperand = parseFloat(strip(num1 * num2));
        previousOperand = "";
    } else if (operation === "÷") {
        currentOperand = parseFloat(strip(num1 / num2));
        previousOperand = "";
    }
}

clear();

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});

allClearButton.addEventListener('click', () => {
    clear();
});

deleteButton.addEventListener('click', () => {
    removeLastNumber();
    updateDisplay();
});

operationButtons.forEach(operationButton => {
    operationButton.addEventListener('click', () => {
        appendOperation(operationButton.innerText);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});
