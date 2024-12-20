// Rāda aprēķinu rezultātu
const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
let history = JSON.parse(localStorage.getItem("history")) || [];

// Funkcija, lai pievienotu ciparu
function appendNumber(number) {
  display.value += number;
}

// Funkcija, lai pievienotu operatoru
function appendOperator(operator) {
  display.value += operator;
}

// Funkcija, lai notīrītu ekrānu
function clearDisplay() {
  display.value = "";
}

// Aprēķināšanas funkcija
function calculate() {
  try {
    const result = eval(display.value);
    if (result !== undefined) {
      const expression = display.value + " = " + result;
      history.push(expression);
      localStorage.setItem("history", JSON.stringify(history));
      displayHistory();
      display.value = result;
    }
  } catch (error) {
    display.value = "Kļūda";
  }
}

// Funkcija vēstures attēlošanai
function displayHistory() {
  historyList.innerHTML = "";
  history.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = entry;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Dzēst";
    deleteBtn.onclick = () => deleteEntry(index);
    li.appendChild(deleteBtn);
    historyList.appendChild(li);
  });
}

// Dzēš vienu vēstures ierakstu
function deleteEntry(index) {
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  displayHistory();
}

// Funkcija, lai dzēstu visu vēsturi
function clearHistory() {
  history = [];
  localStorage.removeItem("history");
  displayHistory();
}

// Event listener, lai uztvertu tastatūras ievadi
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Atļauj ciparus un operatorus
  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    appendNumber(key);
  }

  // Enter taustiņš aprēķināšanai
  if (key === "Enter") {
    calculate();
  }

  // Backspace taustiņš dzēšanai
  if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // Escape taustiņš, lai notīrītu ekrānu
  if (key === "Escape") {
    clearDisplay();
  }
});

// Attēlo vēsturi pie lapas ielādes
displayHistory();
