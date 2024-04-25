// Function to clear display
function clearDisplay() {
  display.value = "";
}

// Function to remove last character from display
function backspace() {
  display.value = display.value.slice(0, -1);
}

export { clearDisplay, backspace };
