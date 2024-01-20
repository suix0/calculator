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

function power(exponent, num) {
  return Math.pow(num, exponent);
}

// Create a function to do some operations
function operate(operation, expo, ...nums) {
  let result = 0;

  if (operation === '+') {
    result = add(...nums);
  } else if (operation === '-') {
    result = subtract(...nums);
  } else if (operation === 'x') {
    result = multiply(...nums);
  } else if (operation === '÷') {
    result = division(...nums);
  } else if (operation === '^') {
    result = power(expo, ...nums)
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
  const equals = document.querySelector('.op3.equals');
  const plusMinus = document.querySelector('.op4.changeNum');
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
    numThree = '';
    operationClickCount = 0;
    numberClickCount = 0;
    bucket = 0;
    updatedResultArr = [];
    currentResult = 0;
    updatedResultIndex = 1;
    result = 0;
    operationUsed = '';
    bucketOperation = '';
    plusMinusCountClick = 0;
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
  let updatedResultArr = [];
  let currentResult = 0;
  let bucketOperation = '';
  let updatedResultIndex = 1;

  operationsArr.forEach(operation => {  
    operation.addEventListener('click', () => {
      let operationToUse = operationUsed;
      let num1 = Number(numOne);
      let num2 = Number(numTwo);
      operationClickCount++;
      operationUsed = '';
      operationUsed += operation.textContent;

      if (operationClickCount === 2) {
        if (operationToUse === '^') {
          result = operate(operationToUse, num2, num1);
        } else {
          result = operate(operationToUse, undefined, num1, num2);
        }
        updatedResultArr.push(result);
        display.textContent = String(result);
        bucket = operationClickCount;
        bucketOperation = operation.textContent;
        bucket++;
      } else if (operationClickCount === 3) {
          if (bucketOperation === '^') {
            currentResult = operate(bucketOperation, Number(numThree), result);
          } else {
            currentResult = operate(bucketOperation, undefined ,result, Number(numThree));
          }
          updatedResultArr.push(currentResult);
          display.textContent = String(updatedResultArr[updatedResultIndex]);
          bucketOperation = '';
          bucketOperation = operation.textContent;
          numThree = '';
          bucket = 3;
          currentResult = 0;
          currentResult = updatedResultArr[updatedResultIndex];
      } else if (operationClickCount > 3) {
          currentResult = 0;
          currentResult = updatedResultArr[updatedResultIndex];
          if (bucketOperation === '^') {
            updatedResultArr.push(operate(bucketOperation, Number(numThree), currentResult));
          } else {
            updatedResultArr.push(operate(bucketOperation, undefined, currentResult, Number(numThree)));
          }
          updatedResultIndex++;
          currentResult = updatedResultArr[updatedResultIndex];
          console.log(currentResult);
          display.textContent = String(currentResult);
          bucketOperation = '';
          bucketOperation = operation.textContent;
          numThree = '';
          bucket = 3;
          currentResult = 0;
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

  let plusMinusCountClick = 0;
  plusMinus.addEventListener('click', () => {
    plusMinusCountClick++;
    if (operationClickCount === 0 && plusMinusCountClick === 1) {
      numOne = '-' + numOne;
      display.textContent = '-' + display.textContent;
    } else if (operationClickCount === 0 && plusMinusCountClick > 1) {
      numOne = numOne.slice(1, numOne.length + 1);
      display.textContent = numOne;
      plusMinusCountClick = 0;

    } else if (operationClickCount === 1 && plusMinusCountClick === 1) {
      numTwo = '-' + numTwo;
      display.textContent = '-' + display.textContent;
    } else if (operationClickCount === 1 && plusMinusCountClick > 1) {
      numTwo = numTwo.slice(1, numTwo.length + 1);
      display.textContent = numTwo;
      plusMinusCountClick = 0;
      console.log(bucket);

    } else if (bucket >= 4 && plusMinusCountClick > 1) {
      console.log(bucket);
      numThree = '-' + numThree;
      display.textContent = '-' + display.textContent;
    } else if (bucket >= 4 && plusMinusCountClick === 1) {
      numThree = numThree.slice(1, numThree.length + 1);
      display.textContent = numThree;
      plusMinusCountClick = 0;
    }
  })
}

main()