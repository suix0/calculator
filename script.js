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
function operate(operation, exponent, ...nums) {
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
    result = power(...nums, exponent)
  }

  return result;
}

// Beautify button hover effect
const buttons = document.getElementsByTagName('button');


[...buttons].forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = "0 12px 12px rgba(0, 0, 0, 1)";
  })

  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = "0 0 0 rgba(0, 0, 0, 0)";
  })
})






