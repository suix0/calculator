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
    plusMinusCountClick2 = 0;
    plusMinusCountClick3 = 0;
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
        console.log(updatedResultArr);
        display.textContent = String(result);
        bucket = operationClickCount;
        bucketOperation = operation.textContent;
        bucket++;
      } else if (operationClickCount === 3) {
        plusMinusCountClick3 = 0;
          if (bucketOperation === '^') {
            currentResult = operate(bucketOperation, Number(numThree), updatedResultArr[updatedResultArr.length - 1]);
          } else {
            currentResult = operate(bucketOperation, undefined ,updatedResultArr[updatedResultArr.length - 1], Number(numThree));
          }
          updatedResultArr.push(currentResult);
          console.log(updatedResultArr);
          display.textContent = String(updatedResultArr[updatedResultArr.length - 1]);
          bucketOperation = '';
          bucketOperation = operation.textContent;
          numThree = '';
          bucket = 3;
          currentResult = 0;
          currentResult = updatedResultArr[updatedResultIndex];
      } else if (operationClickCount > 3) {
        plusMinusCountClick3 = 0;
          currentResult = 0;
          currentResult = updatedResultArr[updatedResultIndex];
          if (bucketOperation === '^') {
            updatedResultArr.push(operate(bucketOperation, Number(numThree), currentResult));
          } else {
            updatedResultArr.push(operate(bucketOperation, undefined, currentResult, Number(numThree)));
          }
          console.log(updatedResultArr);
          updatedResultIndex++;
          currentResult = updatedResultArr[updatedResultIndex];
          display.textContent = String(currentResult);
          bucketOperation = '';
          bucketOperation = operation.textContent;
          numThree = '';
          bucket = 3;
          currentResult = 0;
      }
    })
  })

  let equalsTotal = 0;
  equals.addEventListener('click', () => {
    if (operationClickCount === 1 && updatedResultArr.length === 0) {
      if (operationUsed === '^') {
        equalsTotal = operate(operationUsed, Number(numTwo), Number(numOne));
        console.log(equalsTotal);
        display.textContent = equalsTotal
      } else {
          equalsTotal = operate(operationUsed, undefined, Number(numOne), Number(numTwo));
          display.textContent = equalsTotal;
          console.log(equalsTotal);
      }
    } else if ((operationClickCount === 2 || operationClickCount === 3) && updatedResultArr.length != 0) {
        equalsTotal = updatedResultArr[updatedResultArr.length - 1];
        if (operationUsed === '^') {
          equalsTotal = operate(operationUsed, Number(numThree), equalsTotal);
          console.log(equalsTotal);
          updatedResultArr.push(equalsTotal);
          display.textContent = equalsTotal
        } else {
          equalsTotal = operate(operationUsed, undefined, equalsTotal, Number(numThree));
          updatedResultArr.push(equalsTotal);
          display.textContent = equalsTotal
          console.log(equalsTotal);
        }
        updatedResultIndex++;
        numThree = 0;
    } else if (operationClickCount > 3 && updatedResultArr.length != 0) {
      equalsTotal = updatedResultArr[updatedResultArr.length - 1];
        if (operationUsed === '^') {
          equalsTotal = operate(operationUsed, Number(numThree), equalsTotal);
          console.log(equalsTotal);
          updatedResultArr.push(equalsTotal);
          display.textContent = equalsTotal
        } else {
          equalsTotal = operate(operationUsed, undefined, equalsTotal, Number(numThree));
          updatedResultArr.push(equalsTotal);
          display.textContent = equalsTotal
          console.log(equalsTotal);
        }
        updatedResultIndex++;
        numThree = 0;
    }
  })
  
  let plusMinusCountClick = 0;
  let plusMinusCountClick2 = 0;
  let plusMinusCountClick3 = 0;
  numbersArr.forEach(number => {
    number.addEventListener('click', () => {
      if (operationClickCount === 0) {
        if (number.textContent === '+/-' && plusMinusCountClick === 0) {
          numOne = '-' + numOne;
          display.textContent = numOne;
          plusMinusCountClick = 1;
        } else if (number.textContent === '+/-' && plusMinusCountClick === 1) {
          numOne = numOne.slice(1, numOne.length + 1);
          display.textContent = numOne;
          plusMinusCountClick = 0;
        } else if (number.textContent != '+/-') {
          numOne += number.textContent; // Also save it to num variable for calculation purposes
          display.textContent = numOne; // Update display to the number corresponding to the button clicked
        }

      } else if (operationClickCount === 1) {
          numberClickCount++;
          if (numberClickCount === 1) {
            display.textContent = '';
          }
          if (number.textContent === '+/-' && plusMinusCountClick2 === 0) {
            numTwo = '-' + numTwo;
            display.textContent = numTwo;
            plusMinusCountClick2 = 1;
          } else if (number.textContent === '+/-' && plusMinusCountClick2 === 1) {
            numTwo = numTwo.slice(1, numTwo.length + 1);
            display.textContent = numTwo;
            plusMinusCountClick2 = 0;
          } else if (number.textContent != '+/-') {
            numTwo += number.textContent; 
            display.textContent = numTwo; 
          }
      } else if (bucket === 3) {
          display.textContent = '';
          bucket++;
      }
      if (bucket >= 4) {
        if (number.textContent === '+/-' && plusMinusCountClick3 === 0) {
          numThree = '-' + numThree;
          display.textContent = numThree;
          plusMinusCountClick3 = 1;
        } else if (number.textContent === '+/-' && plusMinusCountClick3 === 1) {
          numThree = numThree.slice(1, numThree.length + 1);
          display.textContent = numThree;
          plusMinusCountClick3 = 0;
        } else if (number.textContent != '+/-') {
          numThree += number.textContent; 
          display.textContent = numThree; 
        }
      }
    })
  });

}

main()