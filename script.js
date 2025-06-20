// Enhanced script.js for Calculator
const display = document.getElementById("display");
const keys = document.querySelectorAll(".key");
const historyList = document.getElementById("history-list");
const historyToggle = document.getElementById("history-toggle");
const historyPanel = document.querySelector(".history-panel");

let currentInput = "";
let memory = 0;
let history = [];

function updateDisplay(value) {
  display.value = value;
}

function calculate() {
  try {
    let expression = currentInput.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-").replace(/√/g, "Math.sqrt").replace(/\^/g, "**");
    let result = eval(expression);
    result = parseFloat(result.toFixed(10));
    history.push(`${currentInput} = ${result}`);
    updateHistory();
    currentInput = result.toString();
    updateDisplay(currentInput);
  } catch (error) {
    updateDisplay("Error");
    currentInput = "";
  }
}

function updateHistory() {
  historyList.innerHTML = "";
  history.slice().reverse().forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function toggleSign() {
  if (!currentInput) return;
  const lastNumberMatch = currentInput.match(/(-?\d+(\.\d+)?)$/);
  if (!lastNumberMatch) return;

  const lastNumber = lastNumberMatch[0];
  const negated = lastNumber.startsWith("-")
    ? lastNumber.slice(1)
    : "-" + lastNumber;

  currentInput = currentInput.slice(0, -lastNumber.length) + negated;
  updateDisplay(currentInput);
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const digit = key.dataset.digit;
    const action = key.dataset.action;

    if (digit !== undefined) {
      currentInput += digit;
      updateDisplay(currentInput);
    } else if (action) {
      switch (action) {
        case "clear":
          currentInput = "";
          updateDisplay("");
          break;
        case "backspace":
          currentInput = currentInput.slice(0, -1);
          updateDisplay(currentInput);
          break;
        case "equals":
          calculate();
          break;
        case "add":
          currentInput += "+";
          updateDisplay(currentInput);
          break;
        case "subtract":
          currentInput += "−";
          updateDisplay(currentInput);
          break;
        case "multiply":
          currentInput += "×";
          updateDisplay(currentInput);
          break;
        case "divide":
          currentInput += "÷";
          updateDisplay(currentInput);
          break;
        case "sqrt":
          currentInput += "√(";
          updateDisplay(currentInput);
          break;
        case "percent":
          currentInput += "/100";
          updateDisplay(currentInput);
          break;
        case "power":
          currentInput += "^";
          updateDisplay(currentInput);
          break;
        case "memory-clear":
          memory = 0;
          break;
        case "memory-recall":
          currentInput += memory;
          updateDisplay(currentInput);
          break;
        case "memory-add":
          try {
            memory += eval(currentInput);
          } catch {}
          break;
        case "memory-subtract":
          try {
            memory -= eval(currentInput);
          } catch {}
          break;
        case "toggle-sign":
          toggleSign();
          break;
      }
    }
  });
});

historyToggle.addEventListener("click", () => {
  historyPanel.classList.toggle("show");
});