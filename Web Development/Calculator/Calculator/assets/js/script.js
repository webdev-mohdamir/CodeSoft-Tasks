// Selector for calculator element and its children
const calulator = document.querySelector("#codesoft_calculator") || null;
const display = calulator?.querySelector("#number_display") || null;
const keys = calulator?.querySelectorAll(".keys") || [];

// Check if display element is found
if (!display) {
  throw Error("Display not found");
}

// Check if keys elements are found
if (keys.length == 0) {
  throw Error("Keys not found");
}

// Add click event listener to each key
keys.forEach((key) => {
  key.addEventListener("click", (event) => {
    handleClicks(event);
  });

  // Add title attribute to each key based on its dataset value
  key.setAttribute("title", key.dataset.value);
});

// Array of operators
const operators = ["+", "-", "*", "/"];

// Function to handle click events
function handleClicks(event) {
  const value = event.target.dataset.value;

  // Check if value is found
  if (!value || value.length == 0) throw new Error("Value not found");

  // Clear display when "C" is clicked
  if (value.toLowerCase() == "c") return clearDisplay();

  // Remove last character from display when "backspace" is clicked
  if (value.toLowerCase() == "backspace") return backspace();

  // Compute expression and update display when "=" is clicked
  if (value.toLowerCase() == "=") return handleEqual();

  // Handle operator
  if (handleOperator(value)) return;

  // Handle value
  handleValue(value);
}

// Function to clear display
function clearDisplay() {
  display.value = "";
}

// Function to remove last character from display
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Function to compute expression and update display
function handleEqual(value) {
  // taking value just to check if its an operator so we can use it for the first time in compute
  display.value = compute(value);
}

// Function to handle operator
function handleOperator(value) {
  // Check if previous and current operators are same
  if (
    operators.includes(display.value.slice(-1)) &&
    operators.includes(value)
  ) {
    display.value = display.value.slice(0, -1) + value;
    return true;
  }
  return false;
}

// Function to handle value
function handleValue(value) {
  // Check if decimal point is already added
  if (display.value.endsWith(".") && value === ".") {
    return;
  }
  display.value += value;
  compute();
}

// Function to compute expression
function compute() {
  const expression = display.value;

  // Regular expression to match numbers, operators, and decimal points
  const regex = /(-?\d+\.?\d*)([+\-*/])?/g;
  const matches = [...expression.matchAll(regex)];

  let result = 0;
  let operator = "+";

  // Iterate over matches and compute result
  matches.forEach((match) => {
    const [_, operand, nextOperator] = match;
    switch (operator) {
      case "+":
        result += parseFloat(operand);
        break;
      case "-":
        result -= parseFloat(operand);
        break;
      case "*":
        result *= parseFloat(operand);
        break;
      case "/":
        result /= parseFloat(operand);
        break;
    }
    operator = nextOperator;
  });

  return result;
}
