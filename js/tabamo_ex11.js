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
  "Pick-up": [true, 0],
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

  // Name
  if (personName.value === "") {
    document.getElementById("sName").innerHTML = "❌ Name is missing";
  } else {
    document.getElementById("sName").innerHTML = "✔️ Valid";
  }

  // Mobile Number
  if (mobileNumber.value === "") {
    document.getElementById("sMobileNumber").innerHTML =
      "❌ Mobile number is missing";
  } else if (!mobileNumber.validity.valid) {
    document.getElementById("sMobileNumber").innerHTML =
      "❌ Invalid mobile number";
  } else {
    document.getElementById("sMobileNumber").innerHTML = "✔️ Valid";
  }

  // Email Address
  if (emailAddress.value === "") {
    document.getElementById("sEmailAddress").innerHTML =
      "❌ Email address is missing";
  } else if (!emailAddress.validity.valid) {
    document.getElementById("sEmailAddress").innerHTML =
      "❌ Invalid email address";
  } else {
    document.getElementById("sEmailAddress").innerHTML = "✔️ Valid";
  }

  // Number of People
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

  // Party Details: Appetizers
  for (let i = 0; i < appetizers.length; i++) {
    switch (appetizers[i].id) {
      case "salad":
        appetizersObject["Salad"][0] = appetizers[i].checked;
      case "breadWithDip":
        appetizersObject["Bread w/ Dip"][0] = appetizers[i].checked;
      case "tomatoSurprise":
        appetizersObject["Tomato Surprise"][0] = appetizers[i].checked;
      case "mushroomBites":
        appetizersObject["Mushroom Bites"][0] = appetizers[i].checked;
    }
  }
  for (let [appetizer, [checked, price]] of Object.entries(appetizersObject)) {
    if (checked) {
      document.getElementById("sAppetizer").innerHTML = "✔️ Valid";
      selectedAppetizer = appetizer;
      mealCost += price;
    }
  }

  // Party Details: Main Dishes
  for (let i = 0; i < mainDish.length; i++) {
    switch (mainDish[i].id) {
      case "roastBeef":
        mainDishObject["Roast Beef"][0] = mainDish[i].checked;
      case "beefSteak":
        mainDishObject["Beef Steak"][0] = mainDish[i].checked;
      case "porkSpareribs":
        mainDishObject["Pork Spareribs"][0] = mainDish[i].checked;
      case "porkMarbella":
        mainDishObject["Pork Marbella"][0] = mainDish[i].checked;
      case "grilledChicken":
        mainDishObject["Grilled Chicken"][0] = mainDish[i].checked;
      case "roastChicken":
        mainDishObject["Roast Chicken"][0] = mainDish[i].checked;
      case "broiledSalmon":
        mainDishObject["Broiled Salmon"][0] = mainDish[i].checked;
      case "grilledSalmon":
        mainDishObject["Grilled Salmon"][0] = mainDish[i].checked;
    }
  }
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

  // Party Details: Desserts
  for (let i = 0; i < dessert.length; i++) {
    switch (dessert[i].id) {
      case "moltenChocolateCake":
        dessertObject["Molten Chocolate Cake"][0] = dessert[i].checked;
      case "redVelvetCake":
        dessertObject["Red Velvet Cake"][0] = dessert[i].checked;
      case "lemonBars":
        dessertObject["Lemon Bars"][0] = dessert[i].checked;
      case "peanutButterBars":
        dessertObject["Peanut Butter Bars"][0] = dessert[i].checked;
      case "bukoPie":
        dessertObject["Buko Pie"][0] = dessert[i].checked;
      case "lemonMeringuePie":
        dessertObject["Lemon Meringue Pie"][0] = dessert[i].checked;
    }
  }
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

  // Party Details: Rice
  for (let i = 0; i < rice.length; i++) {
    switch (rice[i].id) {
      case "plainRice":
        riceObject["Plain Rice"][0] = rice[i].checked;
      case "garlicRice":
        riceObject["Garlic Rice"][0] = rice[i].checked;
      case "bagoongRice":
        riceObject["Bagoong Rice"][0] = rice[i].checked;
    }
  }
  for (let [rice, [checked, price]] of Object.entries(riceObject)) {
    if (checked) {
      selectedRice = rice;
      document.getElementById("sRice").innerHTML = "✔️ Valid";
      mealCost += price;
    }
  }

  // Party Details: Drinks
  for (let i = 0; i < drinks.length; i++) {
    switch (drinks[i].id) {
      case "cucumberLemonade":
        drinksObject["Cucumber Lemonade"][0] = drinks[i].checked;
      case "redIcedTea":
        drinksObject["Red Iced Tea"][0] = drinks[i].checked;
      case "ripeMangoJuice":
        drinksObject["Ripe Mango Juice"][0] = drinks[i].checked;
    }
  }
  for (let [drink, [checked, price]] of Object.entries(drinksObject)) {
    if (checked) {
      selectedDrink = drink;
      document.getElementById("sDrink").innerHTML = "✔️ Valid";
      mealCost += price;
    }
  }

  // Venue Details: Retrieval Options
  let retrievalOptions = document.getElementsByName("retrievalOptions");
  for (let i = 0; i < retrievalOptions.length; i++) {
    switch (retrievalOptions[i].id) {
      case "storePickup":
        retrievalOptionsObject["Pick-up"][0] = retrievalOptions[i].checked;
      case "delivery":
        retrievalOptionsObject["Delivery"][0] = retrievalOptions[i].checked;
    }
  }
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
  for (let [retrievalOption, [checked, _]] of Object.entries(
    retrievalOptionsObject
  )) {
    if (checked) {
      selectedRetrievalOption = retrievalOption;
      document.getElementById("sRetrievalOption").innerHTML =
        "✔️ " + retrievalOption;
    }
  }
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

  // Venue Details: Party Date
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

  // Venue Details: Party Time
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

  // Cost
  document.getElementById("sDeliveryFee").innerHTML = "₱" + deliveryFee;
  document.getElementById("sMealCost").innerHTML = "₱" + mealCost;
  if (qtyPeople >= 10) {
    document.getElementById("sCost").innerHTML =
      "<p>₱" + (mealCost * qtyPeople + deliveryFee);
  } else if (qtyPeople < 10) {
    document.getElementById("sCost").innerHTML =
      "❌ At least 10 people required";
  }

  // Validation User Feedback
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

function alertSummary() {
  if (!document.getElementById("form").checkValidity()) {
    return;
  } else if (selectedMainDishes.length === 0) {
    alert("Please select at least one main dish.");
    return;
  } else if (selectedDesserts.length === 0) {
    alert("Please select at least one dessert.");
    return;
  } else if (!validDate) {
    alert("Please provide a future date.");
    return;
  } else if (!validTime) {
    alert("Delivery times are only from 06:00 to 18:00.");
    return;
  }

  summaryMessage = "";
  summaryMessage += "--- CUSTOMER INFORMATION ---\n";
  summaryMessage += "Name: " + personName.value + "\n";
  summaryMessage += "Mobile Number: " + mobileNumber.value + "\n";
  summaryMessage += "Email Address: " + emailAddress.value + "\n";
  summaryMessage += "\n";
  summaryMessage += "--- PARTY DETAILS ---\n";
  summaryMessage += "Number of People: " + qtyPeople + "\n";
  summaryMessage += "Appetizer: " + selectedAppetizer + "\n";
  summaryMessage += "Main Dishes: " + selectedMainDishes.join(", ") + "\n";
  summaryMessage += "Desserts: " + selectedDesserts.join(", ") + "\n";
  summaryMessage += "Rice: " + selectedRice + "\n";
  summaryMessage += "Drink: " + selectedDrink + "\n";
  summaryMessage += "\n";
  summaryMessage += "--- VENUE DETAILS ---\n";
  summaryMessage += "Retrieval Option: " + selectedRetrievalOption + "\n";
  if (selectedRetrievalOption === "Delivery") {
    summaryMessage += "Venue Address: " + venueAddress.value + "\n";
  }
  summaryMessage += "Party Date: " + partyDate.value + "\n";
  summaryMessage += "Party Time: " + partyTime.value + "\n";
  summaryMessage += "\n";
  summaryMessage += "--- COST ---\n";
  summaryMessage += "Meal Cost: ₱" + mealCost + "\n";
  if (selectedRetrievalOption === "Delivery") {
    summaryMessage += "Delivery Fee: ₱" + deliveryFee + "\n";
  }
  summaryMessage += "Total Cost: ₱" + (mealCost * qtyPeople + deliveryFee);
  alert(summaryMessage);
}

function resetForm() {
  document.getElementById("form").reset();
  updateSummary();
}

document.getElementById("form").oninput = updateSummary;
document.getElementById("submit-button").onclick = alertSummary;
document.getElementById("reset-button").onclick = resetForm;

window.onload = updateSummary;
