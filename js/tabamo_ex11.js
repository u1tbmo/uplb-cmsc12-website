/* Tabamo, Euan Jed S. | B-1L */
/* Exercise 11 - November 29, 2023 */
/* This JS file contains all logic for summarizing costs, validation of inputs, etc. */

// DOM elements
let personName = document.getElementById("name");
let mobileNumber = document.getElementById("mobileNumber");
let emailAddress = document.getElementById("emailAddress");
let qty = document.getElementById("qty");
let appetizers = document.getElementsByName("appetizer");
let mainDishes = document.getElementsByName("mainDishes");
let desserts = document.getElementsByName("desserts");
let rice = document.getElementsByName("rice");
let drinks = document.getElementsByName("drink");
let retrievalOptions = document.getElementsByName("retrievalOptions");
let venueAddress = document.getElementById("venueAddress");
let partyDate = document.getElementById("partyDate");
let partyTime = document.getElementById("partyTime");
let sName = document.getElementById("sName");
let sMobileNumber = document.getElementById("sMobileNumber");
let sEmailAddress = document.getElementById("sEmailAddress");
let sQty = document.getElementById("sQty");
let sAppetizers = document.getElementById("sAppetizers");
let sMainDishes = document.getElementById("sMainDishes");
let sDesserts = document.getElementById("sDesserts");
let sRice = document.getElementById("sRice");
let sDrinks = document.getElementById("sDrinks");
let sRetrievalOption = document.getElementById("sRetrievalOption");
let sVenueAddress = document.getElementById("sVenueAddress");
let sPartyDate = document.getElementById("sPartyDate");
let sPartyTime = document.getElementById("sPartyTime");

// Variables
// Keep track of qty of people, cost per meal, delivery fee
let qtyPeople = 0;
let mealCost = 0;
let deliveryFee = 0;

// Objects
// Keep track of checked items and their prices
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

// Arrays
let elementsArray = [
  personName,
  mobileNumber,
  emailAddress,
  qty,
  venueAddress,
  partyDate,
  partyTime,
];

let sElementsArray = [
  sName,
  sMobileNumber,
  sEmailAddress,
  sQty,
  sVenueAddress,
  sPartyDate,
  sPartyTime,
];

let sOptionElementsArray = [
  sAppetizers,
  sMainDishes,
  sDesserts,
  sRice,
  sDrinks,
  sRetrievalOption,
];

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

  // Selection: Appetizer, Main Dishes, Desserts, Rice, Drink, Retrieval Option
  updateAppetizerSelection();
  updateMainDishSelection();
  updateDessertSelection();
  updateRiceSelection();
  updateDrinkSelection();
  updateRetrievalOptionSelection();

  // Input Validation: Venue Address, Party Date, Party Time
  validateVenueAddress();
  validatePartyDate();
  validatePartyTime();

  // Update: Cost per Meal, Delivery Fee, Total Cost
  updateMealCost();
  updateDeliveryFee();
  updateTotalCost();

  // Update Validation Messages
  updateValidationMessages();
}

// Input Validation Functions
function validateName() {
  if (personName.value === "") {
    sName.innerHTML = "❌ Enter your name";
  } else if (personName.value.length < 2) {
    document.getElementById(
      "sName"
    ).innerHTML = `❌ ${personName.value} is too short`;
  } else {
    sName.innerHTML = "✔️ Valid";
  }
}

function validateMobileNumber() {
  if (mobileNumber.value === "") {
    sMobileNumber.innerHTML = "❌ Enter your mobile number";
  } else if (!mobileNumber.validity.valid) {
    document.getElementById(
      "sMobileNumber"
    ).innerHTML = `❌ ${mobileNumber.value} is not a valid mobile number`;
  } else {
    sMobileNumber.innerHTML = "✔️ Valid";
  }
}

function validateEmailAddress() {
  if (emailAddress.value === "") {
    sEmailAddress.innerHTML = "❌ Enter your email address";
  } else if (!emailAddress.validity.valid) {
    document.getElementById(
      "sEmailAddress"
    ).innerHTML = `❌ ${emailAddress.value} is not a valid email address`;
  } else {
    sEmailAddress.innerHTML = "✔️ Valid";
  }
}

function validateQty() {
  if (qty.value === "") {
    sQty.innerHTML = "❌ Enter the number of people";
    qtyPeople = null;
  } else if (parseInt(qty.value) < 10 && parseInt(qty.value) >= 0) {
    sQty.innerHTML = `❌ ${qty.value} is less than 10, we require at least 10 people`;
    qtyPeople = null;
  } else if (!qty.validity.valid || parseInt(qty.value) < 0) {
    sQty.innerHTML = `❌ ${qty.value} is not a valid quantity`;
    qtyPeople = null;
  } else {
    qtyPeople = qty.value;
    sQty.innerHTML = "✔️ Valid";
  }
}

// Selection Functions
function updateSelection(choices, object) {
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    const itemId = choice.id;

    if (itemId in object) {
      object[itemId][0] = choice.checked;
    }
  }
}

function updateAppetizerSelection() {
  updateSelection(appetizers, appetizersObject);
  for (let [appetizer, [checked, price]] of Object.entries(appetizersObject)) {
    if (checked) {
      sAppetizers.innerHTML = "✔️ Valid";
      selectedAppetizer = appetizer;
      mealCost += price;
      break;
    }
  }
}

function updateMainDishSelection() {
  updateSelection(mainDishes, mainDishObject);

  selectedMainDishes = [];
  for (let [mainDish, [checked, price]] of Object.entries(mainDishObject)) {
    if (checked) {
      selectedMainDishes.push(mainDish);
      mealCost += price;
    }
  }

  if (selectedMainDishes.length === 0) {
    sMainDishes.innerHTML = "❌ No main dishes selected";
  } else {
    sMainDishes.innerHTML = "✔️ Valid";
  }
}

function updateDessertSelection() {
  updateSelection(desserts, dessertObject);

  selectedDesserts = [];
  for (let [dessert, [checked, price]] of Object.entries(dessertObject)) {
    if (checked) {
      selectedDesserts.push(dessert);
      mealCost += price;
    }
  }

  if (selectedDesserts.length === 0) {
    sDesserts.innerHTML = "❌ No desserts selected";
  } else {
    sDesserts.innerHTML = "✔️ Valid";
  }
}

function updateRiceSelection() {
  updateSelection(rice, riceObject);

  for (let [riceType, [checked, price]] of Object.entries(riceObject)) {
    if (checked) {
      selectedRice = riceType;
      sRice.innerHTML = "✔️ Valid";
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
      sDrinks.innerHTML = "✔️ Valid";
      mealCost += price;
      break;
    }
  }
}

function updateRetrievalOptionSelection() {
  if (retrievalOptions[0].checked) {
    selectedRetrievalOption = retrievalOptions[0].id;
  } else {
    selectedRetrievalOption = retrievalOptions[1].id;
  }
  sRetrievalOption.innerHTML = "✔️ " + selectedRetrievalOption;
  updateVenueAddress();
}

// Input Validation Functions
function updateVenueAddress() {
  if (qtyPeople >= 10 && selectedRetrievalOption === "Delivery") {
    deliveryFee = (Math.ceil(qtyPeople / 50) + 1) * 500;
    venueAddress.disabled = false;
    venueAddress.placeholder = "Address here...";
  } else if (qtyPeople < 10 && selectedRetrievalOption === "Delivery") {
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
    sVenueAddress.innerHTML = "❌ Venue address is missing";
  } else if (venueAddress.disabled) {
    sVenueAddress.innerHTML = "✔️ No address needed for store pickup";
    document.getElementById("venueAddress").value = "";
  } else {
    sVenueAddress.innerHTML = "✔️ Valid";
  }
}

function deliveryDateIsInvalid() {
  return partyDate.valueAsDate < currentDate || partyDateDay === currentDateDay;
}

function deliveryTimeIsInvalid() {
  return (
    (hour > 6 && hour < 18) ||
    (hour === 6 && minute >= 0) ||
    (hour === 18 && minute === 0)
  );
}

function validatePartyDate() {
  let currentDate = new Date();
  currentDateDay = parseInt(currentDate.toString().split(" ")[2]);
  partyDateDay = parseInt(partyDate.value.split("-")[2]);
  if (partyDate.value === "") {
    sPartyDate.innerHTML = "❌ Please provide a future date.";
    validDate = false;
  } else if (!partyDate.validity.valid || deliveryDateIsInvalid()) {
    sPartyDate.innerHTML = "❌ Please provide a future date.";
    validDate = false;
  } else {
    sPartyDate.innerHTML = "✔️ Valid";
    validDate = true;
  }
}

function validatePartyTime() {
  partyTimeHour = parseInt(partyTime.value.split(":")[0]);
  partyTimeMinute = parseInt(partyTime.value.split(":")[1]);
  if (partyTime.value === "") {
    sPartyTime.innerHTML = "❌ Delivery times are only from 06:00 to 18:00.";
    validTime = false;
  } else if (!partyTime.validity.valid || deliveryTimeIsInvalid()) {
    sPartyTime.innerHTML = "❌ Delivery times are only from 06:00 to 18:00.";
    validTime = false;
  } else {
    sPartyTime.innerHTML = "✔️ Valid";
    validTime = true;
  }
}

// Update Functions
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
  for (let [idx, sElement] of sElementsArray.entries()) {
    if (sElement.innerHTML.includes("❌")) {
      elementsArray[idx].classList.add("invalid");
      elementsArray[idx].classList.remove("valid");
      sElement.classList.remove("hide");
    } else {
      elementsArray[idx].classList.add("valid");
      elementsArray[idx].classList.remove("invalid");
      sElement.classList.add("hide");
    }
  }

  for (let sOptionElement of sOptionElementsArray) {
    if (sOptionElement.innerHTML.includes("❌")) {
      sOptionElement.classList.remove("hide");
    } else {
      sOptionElement.classList.add("hide");
    }
  }
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
  let summaryMessage = `--- CUSTOMER INFORMATION ---
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

// Event Listeners
document.getElementById("form").addEventListener("input", updateSummary);
document
  .getElementById("submit-button")
  .addEventListener("click", alertSummary);
document.getElementById("reset-button").addEventListener("click", resetForm);
window.addEventListener("load", updateSummary);
