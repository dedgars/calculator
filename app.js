const opButtons = document.querySelectorAll('.op-buttons');
const digitButtons = document.querySelectorAll('.digit-buttons');
const equalButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clear-button');
const delButton = document.querySelector('.del-button');
const previousNumberString = document.querySelector('.screenUp');
const currentNumberString = document.querySelector('.screen');
let currentNumber = '';
let previousNumber = '';
let currentOperation = undefined;

function clear () {
    currentNumber = '';
    previousNumber = '';
    console.log(currentNumber);
    console.log(previousNumber);
}

function appendNumber(number) {
    if (number == "." && currentNumber.includes(".")) return;
    currentNumber = currentNumber.toString() + number.toString();
};

function chooseOp(operation) {
    currentOperation = operation;
    if (currentNumber == '') return;
    if (previousNumber != '') {
        calculate(operation);
    };
    
    previousNumber = currentNumber;
    currentNumber = '';
}

function updateScreen() {
    currentNumberString.innerText = currentNumber;
    previousNumberString.innerText = previousNumber;
};

function deleteDigit() {
    currentNumber = currentNumber.toString().slice(0, -1);
};

function calculate(operation) {
    let result;
    let current = parseFloat(currentNumber);
    let previous = parseFloat(previousNumber);
    if (isNaN(previous) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case 'x':
            result = previous * current;
            break;
        case '/':
            result = previous / current;
            break;
        default:
            return
    }
    currentNumber = result;
    previousNumber = '';
    currentOperation = undefined;
}




digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateScreen();
    });
});

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOp(button.innerText);
        updateScreen();
    })
})

equalButton.addEventListener('click', button => {
    calculate(currentOperation);
    updateScreen();
});

clearButton.addEventListener('click', button => {
    clear();
    updateScreen()
});
delButton.addEventListener('click', button => {
    deleteDigit();
    updateScreen()
});