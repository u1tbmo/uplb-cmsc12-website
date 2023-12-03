/* Tabamo, Euan Jed S. | B-1L */
/* Exercise 11 - November 29, 2023 */
/* This JS file contains all logic for summarizing costs, validation of inputs, etc. */

// DOM elements
let personName = document.getElementById("name");
let mobileNumber = document.getElementById("mobileNumber");
let emailAddress = document.getElementById("emailAddress");
let qty = document.getElementById("qty");
let appetizers = document.getElementsByName("appetizer");
let mainDish = document.getElementsByName("mainDishes");
let dessert = document.getElementsByName("desserts");
let rice = document.getElementsByName("rice");
let drinks = document.getElementsByName("drink");
let retrievalOptions = document.getElementsByName("retrievalOptions");
let venueAddress = document.getElementById("venueAddress");
let partyDate = document.getElementById("partyDate");
let partyTime = document.getElementById("partyTime");

// Variables
let qtyPeople = 0;
let mealCost = 0;
let deliveryFee = 0;
let summaryMessage = "";

// Objects
let appetizersObject = {
  Salad: [true, 100],
  "Bread w/ Dip": [false, 70],
  "Tomato Surprise": [false, 120],
  "Mushroom Bites": [false, 150],
};
let mainDishObject = {
  "Roast Beef": [false, 300],
  "Beef Steak": [false, 270],
  "Pork Spareribs": [false, 240],
  "Pork Marbella": [false, 250],
  "Grilled Chicken": [false, 190],
  "Roast Chicken": [false, 190],
  "Broiled Salmon": [false, 170],
  "Grilled Salmon": [false, 180],
};
let dessertObject = {
  "Molten Chocolate Cake": [false, 120],
  "Red Velvet Cake": [false, 90],
  "Lemon Bars": [false, 50],
  "Peanut Butter Bars": [false, 60],
  "Buko Pie": [false, 50],
  "Lemon Meringue Pie": [false, 70],
};
let riceObject = {
  "Plain Rice": [true, 30],
  "Garlic Rice": [false, 40],
  "Bagoong Rice": [false, 35],
};
let drinksObject = {
  "Cucumber Lemonade": [true, 60],
  "Red Iced Tea": [false, 50],
  "Ripe Mango Juice": [false, 70],
};
let retrievalOptionsObject = {
  "Store Pickup": [true, 0],
  Delivery: [false, 1000],
};

// Selected Values
let selectedAppetizer = "";
let selectedMainDishes = [];
let selectedDesserts = [];
let selectedRice = "";
let selectedDrink = "";
let selectedRetrievalOption = "";
let validDate = false;
let validTime = false;

// This function summarizes the costs and validates the inputs.
function updateSummary() {
  // Reset values
  qtyPeople = 0;
  mealCost = 0;
  deliveryFee = 0;

  // Input Validation: Name, Mobile Number, Email Address, Number of People
  validateName();
  validateMobileNumber();
  validateEmailAddress();
  validateQty();

  // Meal Selection: Appetizer, Main Dishes, Desserts, Rice, Drink
  updateAppetizerSelection();
  updateMainDishSelection();
  updateDessertSelection();
  updateRiceSelection();
  updateDrinkSelection();

  // Selection: Retrieval Options
  updateRetrievalOptionSelection();

  // Input Validation: Venue Address, Party Date, Party Time
  validateVenueAddress();
  validatePartyDate();
  validatePartyTime();

  // Calculate Cost: Cost per Meal, Delivery Fee, Total Cost
  updateMealCost();
  updateDeliveryFee();
  updateTotalCost();

  // Update Validation Messages
  updateValidationMessages();
}

function alertSummary() {
  if (!document.getElementById("form").checkValidity()) {
    return;
  } else if (selectedMainDishes.length === 0) {
    document.getElementById("mainDishesDiv").scrollIntoView();
    alert("Please select at least one main dish.");
    return;
  } else if (selectedDesserts.length === 0) {
    document.getElementById("dessertsDiv").scrollIntoView();
    alert("Please select at least one dessert.");
    return;
  } else if (!validDate) {
    alert("Please provide a future date.");
    return;
  } else if (!validTime) {
    alert("Delivery times are only from 06:00 to 18:00.");
    return;
  }
  summaryMessage = `
--- CUSTOMER INFORMATION ---
Name: ${personName.value}
Mobile Number: ${mobileNumber.value}
Email Address: ${emailAddress.value}
--- PARTY DETAILS ---
Number of People: ${qtyPeople}
Appetizer: ${selectedAppetizer}
Main Dishes: ${selectedMainDishes.join(", ")}
Desserts: ${selectedDesserts.join(", ")}
Rice: ${selectedRice}
Drink: ${selectedDrink}
--- VENUE DETAILS ---
Retrieval Option: ${selectedRetrievalOption}
Venue Address: ${
    selectedRetrievalOption === "Delivery" ? venueAddress.value : "N/A"
  }
Party Date: ${partyDate.value}
Party Time: ${partyTime.value}
--- COST ---
Cost per Meal: ₱${mealCost.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
Delivery Fee: ${
    selectedRetrievalOption === "Delivery"
      ? `₱${deliveryFee.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "N/A"
  }
Total Cost: ₱${(mealCost * qtyPeople + deliveryFee).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
  `;
  alert(summaryMessage);
}

function resetForm() {
  document.getElementById("form").reset();
  updateSummary();
}

function validateName() {
  if (personName.value === "") {
    document.getElementById("sName").innerHTML = "❌ Name is missing";
  } else {
    document.getElementById("sName").innerHTML = "✔️ Valid";
  }
}

function validateMobileNumber() {
  if (mobileNumber.value === "") {
    document.getElementById("sMobileNumber").innerHTML =
      "❌ Mobile number is missing";
  } else if (!mobileNumber.validity.valid) {
    document.getElementById("sMobileNumber").innerHTML =
      "❌ Invalid mobile number";
  } else {
    document.getElementById("sMobileNumber").innerHTML = "✔️ Valid";
  }
}

function validateEmailAddress() {
  if (emailAddress.value === "") {
    document.getElementById("sEmailAddress").innerHTML =
      "❌ Email address is missing";
  } else if (!emailAddress.validity.valid) {
    document.getElementById("sEmailAddress").innerHTML =
      "❌ Invalid email address";
  } else {
    document.getElementById("sEmailAddress").innerHTML = "✔️ Valid";
  }
}

function validateQty() {
  if (qty.value === "") {
    document.getElementById("sQty").innerHTML =
      "❌ Number of People is missing";
    qtyPeople = null;
  } else if (parseInt(qty.value) < 10) {
    document.getElementById("sQty").innerHTML =
      "❌ At least 10 people required";
    qtyPeople = null;
  } else if (!qty.validity.valid) {
    document.getElementById("sQty").innerHTML = "❌ Invalid Number of People";
    qtyPeople = null;
  } else {
    qtyPeople = qty.value;
    document.getElementById("sQty").innerHTML = "✔️ Valid";
  }
}

function updateAppetizerSelection() {
  updateSelection(appetizers, appetizersObject);

  for (let [appetizer, [checked, price]] of Object.entries(appetizersObject)) {
    if (checked) {
      document.getElementById("sAppetizer").innerHTML = "✔️ Valid";
      selectedAppetizer = appetizer;
      mealCost += price;
      break;
    }
  }
}

function updateMainDishSelection() {
  updateSelection(mainDish, mainDishObject);

  selectedMainDishes = [];
  for (let [mainDish, [checked, price]] of Object.entries(mainDishObject)) {
    if (checked) {
      selectedMainDishes.push(mainDish);
      mealCost += price;
    }
  }

  if (selectedMainDishes.length === 0) {
    document.getElementById("sMainDishes").innerHTML =
      "❌ No main dishes selected";
  } else {
    document.getElementById("sMainDishes").innerHTML = "✔️ Valid";
  }
}
function updateDessertSelection() {
  updateSelection(dessert, dessertObject);

  selectedDesserts = [];
  for (let [dessert, [checked, price]] of Object.entries(dessertObject)) {
    if (checked) {
      selectedDesserts.push(dessert);
      mealCost += price;
    }
  }

  if (selectedDesserts.length === 0) {
    document.getElementById("sDesserts").innerHTML = "❌ No desserts selected";
  } else {
    document.getElementById("sDesserts").innerHTML = "✔️ Valid";
  }
}
function updateRiceSelection() {
  updateSelection(rice, riceObject);

  for (let [rice, [checked, price]] of Object.entries(riceObject)) {
    if (checked) {
      selectedRice = rice;
      document.getElementById("sRice").innerHTML = "✔️ Valid";
      mealCost += price;
      break;
    }
  }
}
function updateDrinkSelection() {
  updateSelection(drinks, drinksObject);

  for (let [drink, [checked, price]] of Object.entries(drinksObject)) {
    if (checked) {
      selectedDrink = drink;
      document.getElementById("sDrink").innerHTML = "✔️ Valid";
      mealCost += price;
      break;
    }
  }
}

function updateRetrievalOptionSelection() {
  updateSelection(retrievalOptions, retrievalOptionsObject);
  updateVenueAddress();

  for (let [retrievalOption, [checked, _]] of Object.entries(
    retrievalOptionsObject
  )) {
    if (checked) {
      selectedRetrievalOption = retrievalOption;
      document.getElementById("sRetrievalOption").innerHTML =
        "✔️ " + retrievalOption;
      break;
    }
  }
}

function updateVenueAddress() {
  if (qtyPeople >= 10 && retrievalOptionsObject["Delivery"][0]) {
    deliveryFee = (Math.ceil(qtyPeople / 50) + 1) * 500;
    venueAddress.disabled = false;
    venueAddress.placeholder = "Address here...";
  } else if (qtyPeople < 10 && retrievalOptionsObject["Delivery"][0]) {
    deliveryFee = 1000;
    venueAddress.disabled = false;
    venueAddress.placeholder = "Address here...";
  } else {
    venueAddress.disabled = true;
    venueAddress.placeholder = "Store pickup is selected.";
  }
}

function validateVenueAddress() {
  if (!venueAddress.disabled && venueAddress.value === "") {
    document.getElementById("sVenueAddress").innerHTML =
      "❌ Venue address is missing";
  } else if (venueAddress.disabled) {
    document.getElementById("sVenueAddress").innerHTML =
      "✔️ No address needed for store pickup";
    document.getElementById("venueAddress").value = "";
  } else {
    document.getElementById("sVenueAddress").innerHTML = "✔️ Valid";
  }
}

function validatePartyDate() {
  let currentDate = new Date();
  currentDateDay = parseInt(currentDate.toString().split(" ")[2]);
  partyDateDay = parseInt(partyDate.value.split("-")[2]);
  if (partyDate.value === "") {
    document.getElementById("sPartyDate").innerHTML =
      "❌ Please provide a future date.";
    validDate = false;
  } else if (
    !partyDate.validity.valid ||
    partyDate.valueAsDate < currentDate ||
    partyDateDay === currentDateDay
  ) {
    document.getElementById("sPartyDate").innerHTML =
      "❌ Please provide a future date.";
    validDate = false;
  } else {
    document.getElementById("sPartyDate").innerHTML = "✔️ Valid";
    validDate = true;
  }
}

function validatePartyTime() {
  partyTimeHour = parseInt(partyTime.value.split(":")[0]);
  partyTimeMinute = parseInt(partyTime.value.split(":")[1]);
  if (partyTime.value === "") {
    document.getElementById("sPartyTime").innerHTML =
      "❌ Delivery times are only from 06:00 to 18:00.";
    validTime = false;
  } else if (
    !partyTime.validity.valid ||
    partyTimeHour < 6 ||
    partyTimeHour > 18 ||
    (partyTimeHour === 18 && partyTimeMinute > 0) ||
    (partyTimeHour === 6 && partyTimeMinute < 0)
  ) {
    document.getElementById("sPartyTime").innerHTML =
      "❌ Delivery times are only from 06:00 to 18:00.";
    validTime = false;
  } else {
    document.getElementById("sPartyTime").innerHTML = "✔️ Valid";
    validTime = true;
  }
}

function updateMealCost() {
  document.getElementById("sMealCost").innerHTML =
    "₱" +
    mealCost.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}
function updateDeliveryFee() {
  document.getElementById("sDeliveryFee").innerHTML =
    "₱" +
    deliveryFee.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}
function updateTotalCost() {
  if (qtyPeople >= 10) {
    document.getElementById("sCost").innerHTML =
      "₱" +
      (mealCost * qtyPeople + deliveryFee).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  } else if (qtyPeople < 10) {
    document.getElementById("sCost").innerHTML =
      "❌ At least 10 people required";
  }
}

function updateValidationMessages() {
  let inputs = document.getElementsByClassName("summary");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].innerHTML.startsWith("❌")) {
      inputs[i].classList.add("invalid");
      inputs[i].classList.remove("valid");
    } else {
      inputs[i].classList.remove("invalid");
      inputs[i].classList.add("valid");
    }
  }
}

function updateSelection(choices, object) {
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    const itemId = choice.id;

    if (itemId in object) {
      object[itemId][0] = choice.checked;
    }
  }
}

// Event Listeners
document.getElementById("form").addEventListener("change", updateSummary);
document
  .getElementById("submit-button")
  .addEventListener("click", alertSummary);
document.getElementById("reset-button").addEventListener("click", resetForm);
window.addEventListener("load", updateSummary);
