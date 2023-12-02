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
  // Check if the name is empty, then update the message.
  if (personName.value === "") {
    document.getElementById("sName").innerHTML = "❌ Name is missing";
  } else {
    document.getElementById("sName").innerHTML = "✔️ Valid";
  }

  // Mobile Number
  // Check if the mobile number is empty or is invalid, then update the message.
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
  // Check if the email address is empty or is invalid, then update the message.
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
  // Iterate through all appetizers and check if they are checked.
  // If they are checked, update the object.
  for (let i = 0; i < appetizers.length; i++) {
    switch (appetizers[i].id) {
      case "salad":
        appetizersObject["Salad"][0] = appetizers[i].checked;
        break;
      case "breadWithDip":
        appetizersObject["Bread w/ Dip"][0] = appetizers[i].checked;
        break;
      case "tomatoSurprise":
        appetizersObject["Tomato Surprise"][0] = appetizers[i].checked;
        break;
      case "mushroomBites":
        appetizersObject["Mushroom Bites"][0] = appetizers[i].checked;
        break;
    }
  }
  // Iterate through the appetizers object and check if they are checked.
  // If they are checked, update the message, update the selected appetizer, and add the price to the meal cost.
  for (let [appetizer, [checked, price]] of Object.entries(appetizersObject)) {
    if (checked) {
      document.getElementById("sAppetizer").innerHTML = "✔️ Valid";
      selectedAppetizer = appetizer;
      mealCost += price;
    }
  }

  // Party Details: Main Dishes
  // Iterate through all main dishes and check if they are checked.
  // If they are checked, update the object.
  for (let i = 0; i < mainDish.length; i++) {
    switch (mainDish[i].id) {
      case "roastBeef":
        mainDishObject["Roast Beef"][0] = mainDish[i].checked;
        break;
      case "beefSteak":
        mainDishObject["Beef Steak"][0] = mainDish[i].checked;
        break;
      case "porkSpareribs":
        mainDishObject["Pork Spareribs"][0] = mainDish[i].checked;
        break;
      case "porkMarbella":
        mainDishObject["Pork Marbella"][0] = mainDish[i].checked;
        break;
      case "grilledChicken":
        mainDishObject["Grilled Chicken"][0] = mainDish[i].checked;
        break;
      case "roastChicken":
        mainDishObject["Roast Chicken"][0] = mainDish[i].checked;
        break;
      case "broiledSalmon":
        mainDishObject["Broiled Salmon"][0] = mainDish[i].checked;
        break;
      case "grilledSalmon":
        mainDishObject["Grilled Salmon"][0] = mainDish[i].checked;
        break;
    }
  }
  // Reset the selected main dishes array.
  // Iterate through the main dishes object and check if they are checked.
  // If they are checked, add them to the selected main dishes array and add the price to the meal cost.
  selectedMainDishes = [];
  for (let [mainDish, [checked, price]] of Object.entries(mainDishObject)) {
    if (checked) {
      selectedMainDishes.push(mainDish);
      mealCost += price;
    }
  }
  // Check if there are no selected main dishes, then update the message.
  if (selectedMainDishes.length === 0) {
    document.getElementById("sMainDishes").innerHTML =
      "❌ No main dishes selected";
  } else {
    document.getElementById("sMainDishes").innerHTML = "✔️ Valid";
  }

  // Party Details: Desserts
  // Iterate through all desserts and check if they are checked.
  // If they are checked, update the object.
  for (let i = 0; i < dessert.length; i++) {
    switch (dessert[i].id) {
      case "moltenChocolateCake":
        dessertObject["Molten Chocolate Cake"][0] = dessert[i].checked;
        break;
      case "redVelvetCake":
        dessertObject["Red Velvet Cake"][0] = dessert[i].checked;
        break;
      case "lemonBars":
        dessertObject["Lemon Bars"][0] = dessert[i].checked;
        break;
      case "peanutButterBars":
        dessertObject["Peanut Butter Bars"][0] = dessert[i].checked;
        break;
      case "bukoPie":
        dessertObject["Buko Pie"][0] = dessert[i].checked;
        break;
      case "lemonMeringuePie":
        dessertObject["Lemon Meringue Pie"][0] = dessert[i].checked;
        break;
    }
  }
  // Reset the selected desserts array.
  // Iterate through the desserts object and check if they are checked.
  // If they are checked, add them to the selected desserts array and add the price to the meal cost.
  selectedDesserts = [];
  for (let [dessert, [checked, price]] of Object.entries(dessertObject)) {
    if (checked) {
      selectedDesserts.push(dessert);
      mealCost += price;
    }
  }
  // Check if there are no selected desserts, then update the message.
  if (selectedDesserts.length === 0) {
    document.getElementById("sDesserts").innerHTML = "❌ No desserts selected";
  } else {
    document.getElementById("sDesserts").innerHTML = "✔️ Valid";
  }

  // Party Details: Rice
  // Iterate through all rice and check if they are checked.
  // If they are checked, update the object.
  for (let i = 0; i < rice.length; i++) {
    switch (rice[i].id) {
      case "plainRice":
        riceObject["Plain Rice"][0] = rice[i].checked;
        break;
      case "garlicRice":
        riceObject["Garlic Rice"][0] = rice[i].checked;
        break;
      case "bagoongRice":
        riceObject["Bagoong Rice"][0] = rice[i].checked;
        break;
    }
  }
  // Iterate through the rice object and check if they are checked.
  // If they are checked, update the message, update the selected rice, and add the price to the meal cost.
  for (let [rice, [checked, price]] of Object.entries(riceObject)) {
    if (checked) {
      selectedRice = rice;
      document.getElementById("sRice").innerHTML = "✔️ Valid";
      mealCost += price;
    }
  }

  // Party Details: Drinks
  // Iterate through all drinks and check if they are checked.
  // If they are checked, update the object.
  for (let i = 0; i < drinks.length; i++) {
    switch (drinks[i].id) {
      case "cucumberLemonade":
        drinksObject["Cucumber Lemonade"][0] = drinks[i].checked;
        break;
      case "redIcedTea":
        drinksObject["Red Iced Tea"][0] = drinks[i].checked;
        break;
      case "ripeMangoJuice":
        drinksObject["Ripe Mango Juice"][0] = drinks[i].checked;
        break;
    }
  }
  // Iterate through the drinks object and check if they are checked.
  // If they are checked, update the message, update the selected drink, and add the price to the meal cost.
  for (let [drink, [checked, price]] of Object.entries(drinksObject)) {
    if (checked) {
      selectedDrink = drink;
      document.getElementById("sDrink").innerHTML = "✔️ Valid";
      mealCost += price;
    }
  }

  // Venue Details: Retrieval Options
  // Iterate through all retrieval options and check if they are checked.
  // If they are checked, update the object.
  for (let i = 0; i < retrievalOptions.length; i++) {
    switch (retrievalOptions[i].id) {
      case "storePickup":
        retrievalOptionsObject["Pick-up"][0] = retrievalOptions[i].checked;
        break;
      case "delivery":
        retrievalOptionsObject["Delivery"][0] = retrievalOptions[i].checked;
        break;
    }
  }
  // Update the venue address textarea based on the selected retrieval option and the number of people.
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
  // Iterate through the retrieval options object and check if they are checked.
  // If they are checked, update the message and update the selected retrieval option.
  for (let [retrievalOption, [checked, _]] of Object.entries(
    retrievalOptionsObject
  )) {
    if (checked) {
      selectedRetrievalOption = retrievalOption;
      document.getElementById("sRetrievalOption").innerHTML =
        "✔️ " + retrievalOption;
    }
  }

  // Venue Details: Venue Address
  // Check if the venue address is empty, then update the message.
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
  // Get the current date and the party date.
  // If the party date is empty or is invalid or is not a future date, then update the message.
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
  // Get the party time.
  // Check if the party time is empty or is invalid or is not between 06:00 and 18:00, then update the message.
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
  // Update the cost summary.
  document.getElementById("sDeliveryFee").innerHTML = "₱" + deliveryFee;
  document.getElementById("sMealCost").innerHTML = "₱" + mealCost;
  if (qtyPeople >= 10) {
    document.getElementById("sCost").innerHTML =
      "₱" + (mealCost * qtyPeople + deliveryFee);
  } else if (qtyPeople < 10) {
    document.getElementById("sCost").innerHTML =
      "❌ At least 10 people required";
  }

  // Validation User Feedback
  // Iterate through all summary elements and check if they start with an "❌".
  // If they do, then add the invalid class and remove the valid class to add a red border.
  // If they don't, then add the valid class and remove the invalid class to add a green border.
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

// This function pops up an alert with the summary message.
// This function also checks if there is at least one main dish, at least one dessert, a future date, and a valid time.
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

  // Create the summary message.
  summaryMessage = "";
  summaryMessage += "--- CUSTOMER INFORMATION ---\n";
  summaryMessage += "Name: " + personName.value + "\n";
  summaryMessage += "Mobile Number: " + mobileNumber.value + "\n";
  summaryMessage += "Email Address: " + emailAddress.value + "\n";
  summaryMessage += "--- PARTY DETAILS ---\n";
  summaryMessage += "Number of People: " + qtyPeople + "\n";
  summaryMessage += "Appetizer: " + selectedAppetizer + "\n";
  summaryMessage += "Main Dishes: " + selectedMainDishes.join(", ") + "\n";
  summaryMessage += "Desserts: " + selectedDesserts.join(", ") + "\n";
  summaryMessage += "Rice: " + selectedRice + "\n";
  summaryMessage += "Drink: " + selectedDrink + "\n";
  summaryMessage += "--- VENUE DETAILS ---\n";
  summaryMessage += "Retrieval Option: " + selectedRetrievalOption + "\n";
  if (selectedRetrievalOption === "Delivery") {
    summaryMessage += "Venue Address: " + venueAddress.value + "\n";
  }
  summaryMessage += "Party Date: " + partyDate.value + "\n";
  summaryMessage += "Party Time: " + partyTime.value + "\n";
  summaryMessage += "--- COST ---\n";
  summaryMessage += "Meal Cost per Person: ₱" + mealCost + "\n";
  if (selectedRetrievalOption === "Delivery") {
    summaryMessage += "Delivery Fee: ₱" + deliveryFee + "\n";
  }
  summaryMessage += "Total Cost: ₱" + (mealCost * qtyPeople + deliveryFee);
  alert(summaryMessage);
}

// This function resets the form and updates the summary.
function resetForm() {
  document.getElementById("form").reset();
  updateSummary();
}

document.getElementById("form").oninput = updateSummary;
document.getElementById("submit-button").onclick = alertSummary;
document.getElementById("reset-button").onclick = resetForm;

window.onload = updateSummary;
