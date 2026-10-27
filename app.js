// TABS
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    tabButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    tabPanels.forEach(function (p) {
      p.classList.remove("active");
    });
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// TIP CALCULATOR
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const tipResult = document.getElementById("tip-result");
const tipError = document.getElementById("tip-error");

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const tip = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value, 10);

  if (isNaN(bill) && isNaN(tip)) {
    tipResult.textContent =
      "Please enter a valid bill amount and tip percentage.";
    tipError.textContent = "";
    return;
  }

  if (bill < 0) {
    tipError.textContent = "Bill amount cannot be negative.";
    tipResult.textContent = "_";
    return;
  }

  if (people < 1 || isNaN(people)) {
    tipError.textContent = "Number of people must be at least 1.";
    tipResult.textContent = "_";
    return;
  }

  tipError.textContent = "";
  const total = bill + (bill * (tip || 0)) / 100;
  const perPerson = total / people;
  tipResult.textContent = "$" + perPerson.toFixed(2);
}

billInput.addEventListener("input", calculateTip);
tipInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

// UNIT CONVERTER
const categorySelect = document.getElementById("category");
const fromUnitSelect = document.getElementById("from-unit");
const toUnitSelect = document.getElementById("to-unit");
const convertInput = document.getElementById("convert-value");
const unitResult = document.getElementById("unit-result");
const unitError = document.getElementById("unit-error");

const units = {
  length: {
    m: 1,
    km: 1000,
    mi: 1609.34,
    ft: 0.3048,
    in: 0.0254,
  },
  weight: {
    kg: 1,
    g: 0.001,
    lb: 0.453592,
    oz: 0.0283495,
  },
};

const labels = {
  length: {
    m: "Meters",
    km: "Kilometers",
    mi: "Miles",
    ft: "Feet",
    in: "Inches",
  },
  weight: {
    kg: "Kilograms",
    g: "Grams",
    lb: "Pounds",
    oz: "Ounces",
  },
  temperature: {
    c: "Celsius",
    f: "Fahrenheit",
    k: "Kelvin",
  },
};

function populateUnits() {
  const cat = categorySelect.value;
  const keys = Object.keys(labels[cat]);
  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";

  (keys.forEach(function (key) {
    const opt1 = document.createElement("option");
    opt1.value = key;
    opt1.textContent = labels[cat][key];
    fromUnitSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = key;
    opt2.textContent = labels[cat][key];
    toUnitSelect.appendChild(opt2);
  }),
    (toUnitSelect.selectedIndex = 1)); // Default to second unit for conversion
  calculateUnit(); // Recalculate when category changes
}

function convertUnits(value, from, to) {
  let celcius;
  if (from === "c") celcius = value;
  else if (from === "f") celcius = ((value - 32) * 5) / 9;
  else celcius = value - 273.15;
}

function calculateUnit() {
  const cat = categorySelect.value;
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;
  const value = parseFloat(convertInput.value);

  if (isNaN(value)) {
    unitResult.textContent = "_";
    unitError.textContent = "";
    return;
  }

  let result;
  if (cat === "temperature") {
    result = convertTemperature(value, from, to);
  } else {
    const base = value * units[cat][from];
    result = base / units[cat][to];
  }

  unitError.textContent = "";
  unitResult.textContent = result.toFixed(2) + " " + labels[cat][to];
}

categorySelect.addEventListener("change", populateUnits);
fromUnitSelect.addEventListener("change", calculateUnit);
toUnitSelect.addEventListener("change", calculateUnit);
convertInput.addEventListener("input", calculateUnit);

// BOOT
populateUnits();
