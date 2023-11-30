/* Tabamo, Euan Jed S. | B-1L */
/* Exercise 11 - November 29, 2023 */
/* This JS file contains all logic for summarizing costs, validation of inputs, etc. */
let qtyPeople = 0;
let mealCost = 0;
let deliveryFee = 0;

// This function is called whenever the user changes the value of an input field.
// This function calls all other functions that update the summary.
function updateSummary() {
  qtyPeople = 0;
  mealCost = 0;
  deliveryFee = 0;
  textInputSummary();
  radioSummary();
  checkboxSummary();
  updateTotalCost();
  styleSummary();
}

// This function checks if the input for type inputs are valid.
function textInputSummary() {
  let name = document.getElementById("name");
  let mobileNumber = document.getElementById("mobileNumber");
  let emailAddress = document.getElementById("emailAddress");
  let qty = document.getElementById("qty");
  let venueAddress = document.getElementById("venueAddress");
  let partyDate = document.getElementById("partyDate");
  let partyTime = document.getElementById("partyTime");

  if (name.value == "") {
    document.getElementById("sName").innerHTML = "❌ ";
  } else {
    document.getElementById("sName").innerHTML = "✔️ " + name.value;
  }

  if (mobileNumber.value == "" || mobileNumber.validity.valid == false) {
    document.getElementById("sMobileNumber").innerHTML =
      "❌ " + mobileNumber.value;
  } else {
    document.getElementById("sMobileNumber").innerHTML =
      "✔️ " + mobileNumber.value;
  }

  if (emailAddress.value == "" || emailAddress.validity.valid == false) {
    document.getElementById("sEmailAddress").innerHTML =
      "❌ " + emailAddress.value;
  } else {
    document.getElementById("sEmailAddress").innerHTML =
      "✔️ " + emailAddress.value;
  }

  if (qty.value == "" || qty.validity.valid == false) {
    document.getElementById("sQty").innerHTML = "❌ " + qty.value;
  } else {
    qtyPeople = qty.value;
    document.getElementById("sQty").innerHTML = "✔️ " + qty.value;
  }
}

// This function checks if the input for type radio are valid.
// This function also updates the cost per person.
function radioSummary() {
  let appetizersObject = {
    Salad: [true, 100],
    "Bread w/ Dip": [false, 70],
    "Tomato Surprise": [false, 120],
    "Mushroom Bites": [false, 150],
  };
  let appetizers = document.getElementsByName("appetizer");
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

  let riceObject = {
    "Plain Rice": [true, 30],
    "Garlic Rice": [false, 40],
    "Bagoong Rice": [false, 35],
  };
  let rice = document.getElementsByName("rice");
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

  let drinksObject = {
    "Cucumber Lemonade": [true, 60],
    "Red Iced Tea": [false, 50],
    "Ripe Mango Juice": [false, 70],
  };
  let drinks = document.getElementsByName("drink");
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

  let retrievalOptionsObject = {
    "Pick-up": [true, 0],
    Delivery: [false, 1000],
  };
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
    venueAddress.value = "";
    venueAddress.placeholder = "Store pickup is selected.";
  }

  for (let [appetizer, [checked, price]] of Object.entries(appetizersObject)) {
    if (checked) {
      document.getElementById("sAppetizer").innerHTML = "✔️ " + appetizer;
      mealCost += price;
    }
  }

  for (let [rice, [checked, price]] of Object.entries(riceObject)) {
    if (checked) {
      document.getElementById("sRice").innerHTML = "✔️ " + rice;
      mealCost += price;
    }
  }

  for (let [drink, [checked, price]] of Object.entries(drinksObject)) {
    if (checked) {
      document.getElementById("sDrink").innerHTML = "✔️ " + drink;
      mealCost += price;
    }
  }

  for (let [retrievalOption, [checked, _]] of Object.entries(
    retrievalOptionsObject
  )) {
    if (checked) {
      document.getElementById("sRetrievalOption").innerHTML =
        "✔️ " + retrievalOption;
    }
  }
}

// This function checks if the input for type checkbox are valid.
// This function also updates the cost per person.
function checkboxSummary() {
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
  let mainDish = document.getElementsByName("mainDishes");
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

  let mainDishArray = [];
  for (let [mainDish, [checked, price]] of Object.entries(mainDishObject)) {
    if (checked) {
      mainDishArray.push(mainDish);
      mealCost += price;
    }
  }
  if (mainDishArray.length == 0) {
    document.getElementById("sMainDishes").innerHTML = "❌ ";
  } else {
    document.getElementById("sMainDishes").innerHTML =
      "✔️ " + mainDishArray.join(", ");
  }

  let dessertObject = {
    "Molten Chocolate Cake": [false, 120],
    "Red Velvet Cake": [false, 90],
    "Lemon Bars": [false, 50],
    "Peanut Butter Bars": [false, 60],
    "Buko Pie": [false, 50],
    "Lemon Meringue Pie": [false, 70],
  };
  let dessert = document.getElementsByName("desserts");
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

  let dessertArray = [];
  for (let [dessert, [checked, price]] of Object.entries(dessertObject)) {
    if (checked) {
      dessertArray.push(dessert);
      mealCost += price;
    }
  }
  if (dessertArray.length == 0) {
    document.getElementById("sDesserts").innerHTML = "❌ ";
  } else {
    document.getElementById("sDesserts").innerHTML =
      "✔️ " + dessertArray.join(", ");
  }
}
// This function styles the summary fieldset based on whether the input is valid or not.
function styleSummary() {
  let inputs = document.getElementsByClassName("summary");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].innerHTML == "" || inputs[i].innerHTML.startsWith("❌")) {
      inputs[i].classList.add("invalid");
    } else {
      inputs[i].classList.remove("invalid");
    }
  }
}

// This function updates the total cost.
function updateTotalCost() {
  if (qtyPeople >= 10) {
    document.getElementById("sCost").innerHTML =
      "<p>₱" + (mealCost * qtyPeople + deliveryFee);
  } else if (qtyPeople < 10) {
    document.getElementById("sCost").innerHTML = "❌ Minimum of 10 people";
  }
}

window.onload = updateSummary;
