// Create functions for each operations
function add(...nums) {
  return nums.reduce((sum, num) => sum + num)
}

function subtract(...nums) {
  return nums.reduce((minusResult, num) => minusResult - num);
}

function multiply(...nums) {
  return nums.reduce((product, num) => product * num);
}

function division(...nums) {
  return nums.reduce((divisionResult, num) => divisionResult / num);
}

function power(num, exponent) {
  return Math.pow(num, exponent);
}

// Create a function to do some operations
function operate(operation, ...nums) {
  let result = 0;

  if (operation === '+') {
    result = add(...nums);
  } else if (operation === '-') {
    result = subtract(...nums);
  } else if (operation === 'x') {
    result = multiply(...nums);
  } else if (operation === '÷') {
    result = division(...nums);
  } 

  return result;
}

// Beautify button hover effect
const buttons = document.getElementsByTagName('button');


[...buttons].forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = "0 5px 5px rgba(0, 0, 0, 0.5)";
  })

  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = "0 0 0 rgba(0, 0, 0, 0)";
  })
})

const display = document.querySelector('.display-text');
const numbers = document.getElementsByClassName('num');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.op1.clear');
const operations = document.getElementsByClassName('op2');
const operationsArr = [...operations];

// Store the number when its button is clicked
let numOne = '';
let numTwo = '';
let operationUsed = '';

// Add the numbers to display when their buttons are clicked
let operationClickCount = 0;
let numberClickCount = 0;

[...numbers].forEach(number => {
  number.addEventListener('click', () => {
    if (operationClickCount === 0) {
      numOne += number.textContent; // Also save it to num variable for calculation purposes
      display.textContent += number.textContent; // Update display to the number corresponding to the button clicked
    } else if (operationClickCount === 1) {
      numberClickCount++;
      numTwo += number.textContent;
      display.textContent += number.textContent;
    } 
  })
});

operationsArr.forEach(operation => {  
  operation.addEventListener('click', () => {
    operationUsed += operation.textContent;
    operationClickCount++;
    if (operationUsed == '+') {
      if (numberClickCount > 0) {
        display.textContent = '';
      }
      operationUsed = '';
    }
  })
})

// Add display for decimals
decimal.addEventListener('click', () => {
  if (operationClickCount === 0) {
    numOne += decimal.textContent;
    display.textContent += decimal.textContent;
  } else {
    numTwo += decimal.textContent;
    display.textContent += decimal.textContent;
  }
});

// Clear display
clear.addEventListener('click', () => {
  display.textContent = '';
  numOne = '';
  numTwo = '';
})
