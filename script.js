// Create functions for each operations
function add(...nums) {
  return nums.reduce((sum, num) => Number(sum) + Number(num))
}

function subtract(...nums) {
  return nums.reduce((minusResult, num) => Number(minusResult) - Number(num));
}

function multiply(...nums) {
  return nums.reduce((product, num) => Number(product) * Number(num));
}

function division(...nums) {
  return nums.reduce((divisionResult, num) => Number(divisionResult) / Number(num));
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


function main() {
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
  const numbersArr = [...numbers];

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
    operationClickCount = 0;
    numberClickCount = 0;
    bucket = 0;
  })

  // Add the numbers to display when their buttons are clicked
  let operationClickCount = 0;
  let numberClickCount = 0;
  let numOne = '';
  let numTwo = '';
  let numThree = '';
  let operationUsed = '';
  let bucket = 0;
  let result = 0;
  let updatedResult = [];
  let bucketOperation = '';
  operationsArr.forEach(operation => {  
    operation.addEventListener('click', () => {
      let operationToUse = operationUsed;
      let num1 = Number(numOne);
      let num2 = Number(numTwo);
      operationClickCount++;
      operationUsed = '';
      operationUsed += operation.textContent;
      
      if (operationClickCount === 2) {
        result = operate(operationToUse, num1, num2);
        display.textContent = String(result);
        bucket = operationClickCount;
        bucketOperation = operation.textContent;
        bucket++;
      } else if (operationClickCount === 3) {
        updatedResult.push(operate(bucketOperation, result, Number(numThree)));
        display.textContent = updatedResult;
        bucketOperation = '';
        bucketOperation = operation.textContent;
        console.log(bucketOperation);
        numThree = ''
      } 
      else if (operationClickCount > 3) {
        updatedResult.push((operate(bucketOperation, updatedResult, Number(numThree))));
        display.textContent = updatedResult;
        bucketOperation = '';
        bucketOperation = operation.textContent;
        console.log(bucketOperation);
        numThree = ''
      }
    })
  })
  
  numbersArr.forEach(number => {
    number.addEventListener('click', () => {

      if (operationClickCount === 0) {
        numOne += number.textContent; // Also save it to num variable for calculation purposes
        display.textContent += number.textContent; // Update display to the number corresponding to the button clicked
      } else if (operationClickCount === 1) {
          numberClickCount++;
          if (numberClickCount === 1) {
            display.textContent = '';
          }
          numTwo += number.textContent;
          display.textContent += number.textContent;
      } else if (bucket === 3) {
          display.textContent = '';
          bucket++;
      }
      if (bucket >= 4) {
        numThree += number.textContent;
        display.textContent += number.textContent;
      }
    })
  });
}

main()