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

export { compute };
