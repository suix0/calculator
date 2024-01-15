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
  })

  // Add the numbers to display when their buttons are clicked
  let operationClickCount = 0;
  let numberClickCount = 0;
  let numOne = '';
  let numTwo = '';
  let numThree = '';
  let operationUsed = '';
  let bucket = 0;
  
  operationsArr.forEach(operation => {  
    operation.addEventListener('click', () => {
      let operationToUse = operationUsed;
      let num1 = Number(numOne);
      let num2 = Number(numTwo);
      let num3 = Number(numThree);
      let result = 0;
      let updatedResult = 0;
      let storeResult = 0;
      let nextOperation = '';
      operationClickCount++;
      operationUsed = '';
      operationUsed += operation.textContent;

      if (operationClickCount === 2) {
        result = operate(operationToUse, num1, num2);
        display.textContent = String(result);
        bucket = operationClickCount;
        bucket++;
      } else if (operationClickCount >= 3) {
        nextOperation = operation.textContent;
        console.log(nextOperation);
        updatedResult = operate(nextOperation, result, num3);
        console.log(updatedResult);
        display.textContent = String(updatedResult);
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

      if (operationClickCount >= 3) {

      } 
    })
  });
}

main()

/* Made the calculator work and it displays the result after the 
second time an operation button is clicked. 

To future self, make sure that after a result is displayed. 
For example:
I click 12, then click +, then click 15, 
and then click another operation like -, then it should disply result to 27 (12 + 15), 
then the 27 should be waiting for another number entered and it should minus 27 to next number entered
because i clicked minus - previously.

We can do this bro!!!
*/