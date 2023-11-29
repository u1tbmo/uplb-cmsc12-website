function updateSummary() {
  textInputSummary();
  radioSummary();
  styleSummary();
}

function textInputSummary() {
  if (document.getElementById("name").value != "") {
    document.getElementById("sName").innerHTML =
      document.getElementById("name").value;
    console.log(`Name: ${document.getElementById("name").value}`);
  }
  if (document.getElementById("mobileNumber").value != "") {
    document.getElementById("sMobileNumber").innerHTML =
      document.getElementById("mobileNumber").value;
    console.log(
      `Mobile Number: ${document.getElementById("mobileNumber").value}`
    );
    console.log(
      `Number Validity: ${
        document.getElementById("mobileNumber").validity.valid
      }`
    );
  }
  if (document.getElementById("emailAddress").value != "") {
    document.getElementById("sEmailAddress").innerHTML =
      document.getElementById("emailAddress").value;
    console.log(
      `Email Address: ${document.getElementById("emailAddress").value}`
    );
    console.log(
      `Email Validity: ${
        document.getElementById("emailAddress").validity.valid
      }`
    );
  }
  if (document.getElementById("qty").value != "") {
    document.getElementById("sQty").innerHTML =
      document.getElementById("qty").value;
  }
}

function radioSummary() {
  let appetizersObject = {
    Salad: true,
    "Bread w/ Dip": false,
    "Tomato Surprise": false,
    "Mushroom Bites": false,
  };
  let appetizers = document.getElementsByName("appetizer");
  for (let i = 0; i < appetizers.length; i++) {
    switch (appetizers[i].id) {
      case "salad":
        appetizersObject["Salad"] = appetizers[i].checked;
      case "breadWithDip":
        appetizersObject["Bread w/ Dip"] = appetizers[i].checked;
      case "tomatoSurprise":
        appetizersObject["Tomato Surprise"] = appetizers[i].checked;
      case "mushroomBites":
        appetizersObject["Mushroom Bites"] = appetizers[i].checked;
    }
  }

  let riceObject = {
    "Plain Rice": true,
    "Garlic Rice": false,
    "Bagoong Rice": false,
  };
  let rice = document.getElementsByName("rice");
  for (let i = 0; i < rice.length; i++) {
    switch (rice[i].id) {
      case "plainRice":
        riceObject["Plain Rice"] = rice[i].checked;
      case "garlicRice":
        riceObject["Garlic Rice"] = rice[i].checked;
      case "bagoongRice":
        riceObject["Bagoong Rice"] = rice[i].checked;
    }
  }

  let drinksObject = {
    "Cucumber Lemonade": true,
    "Red Iced Tea": false,
    "Ripe Mango Juice": false,
  };
  let drinks = document.getElementsByName("drink");
  for (let i = 0; i < drinks.length; i++) {
    switch (drinks[i].id) {
      case "cucumberLemonade":
        drinksObject["Cucumber Lemonade"] = drinks[i].checked;
      case "redIcedTea":
        drinksObject["Red Iced Tea"] = drinks[i].checked;
      case "ripeMangoJuice":
        drinksObject["Ripe Mango Juice"] = drinks[i].checked;
    }
  }

  for (let [appetizer, checked] of Object.entries(appetizersObject)) {
    if (checked) {
      document.getElementById("sAppetizer").innerHTML =
        "<p>" + appetizer + "</p>";
    }
  }

  for (let [rice, checked] of Object.entries(riceObject)) {
    if (checked) {
      document.getElementById("sRice").innerHTML = "<p>" + rice + "</p>";
    }
  }

  for (let [drink, checked] of Object.entries(drinksObject)) {
    if (checked) {
      document.getElementById("sDrink").innerHTML = "<p>" + drink + "</p>";
    }
  }
}

function checkboxSummary() {}

function styleSummary() {
  let inputs = document.getElementsByClassName("summary");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].innerText == "-") {
      inputs[i].classList.add("na");
      inputs[i].classList.remove("selected");
    } else if (inputs[i].innerText == "") {
      inputs[i].innerHTML =
        "<p><img src='images/cross_mark_3d.png' alt='crossmark'></p>";
      inputs[i].classList.add("na");
      inputs[i].classList.remove("selected");
    } else {
      inputs[i].classList.remove("na");
      inputs[i].classList.add("selected");
    }
  }
  if (document.getElementById("name").validity.valid) {
    document.getElementById("sName").classList.add("selected");
    document.getElementById("sName").classList.remove("na");
  } else if (document.getElementById("name").value == "") {
    document.getElementById("sName").innerHTML =
      "<p><img src='images/cross_mark_3d.png' alt='crossmark'></p>";
    document.getElementById("sName").classList.add("na");
    document.getElementById("sName").classList.remove("selected");
  } else {
    document.getElementById("sName").classList.remove("selected");
    document.getElementById("sName").classList.add("na");
  }

  if (document.getElementById("mobileNumber").validity.valid) {
    document.getElementById("sMobileNumber").classList.add("selected");
    document.getElementById("sMobileNumber").classList.remove("na");
  } else if (document.getElementById("mobileNumber").value == "") {
    document.getElementById("sMobileNumber").innerHTML =
      "<p><img src='images/cross_mark_3d.png' alt='crossmark'></p>";
    document.getElementById("sMobileNumber").classList.add("na");
    document.getElementById("sMobileNumber").classList.remove("selected");
  } else {
    document.getElementById("sMobileNumber").classList.remove("selected");
    document.getElementById("sMobileNumber").classList.add("na");
  }

  if (document.getElementById("emailAddress").validity.valid) {
    document.getElementById("sEmailAddress").classList.add("selected");
    document.getElementById("sEmailAddress").classList.remove("na");
  } else if (document.getElementById("emailAddress").value == "") {
    document.getElementById("sEmailAddress").innerHTML =
      "<p><img src='images/cross_mark_3d.png' alt='crossmark'></p>";
    document.getElementById("sEmailAddress").classList.add("na");
    document.getElementById("sEmailAddress").classList.remove("selected");
  } else {
    document.getElementById("sEmailAddress").classList.remove("selected");
    document.getElementById("sEmailAddress").classList.add("na");
  }

  if (document.getElementById("qty").value >= 10) {
    document.getElementById("sQty").classList.add("selected");
    document.getElementById("sQty").classList.remove("na");
  } else if (document.getElementById("qty").value == "") {
    document.getElementById("sQty").innerHTML =
      "<p><img src='images/cross_mark_3d.png' alt='crossmark'></p>";
    document.getElementById("sQty").classList.add("na");
    document.getElementById("sQty").classList.remove("selected");
  } else {
    document.getElementById("sQty").classList.remove("selected");
    document.getElementById("sQty").classList.add("na");
  }
}

window.onload = updateSummary;
