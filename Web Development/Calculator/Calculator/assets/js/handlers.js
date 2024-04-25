import { compute } from "./compute.js";
import { clearDisplay, backspace } from "./display.js";

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

export { handleClicks, handleValue, handleOperator, handleEqual };
