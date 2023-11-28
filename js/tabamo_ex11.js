function updateSummary() {}

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
  styleSummary();
}

function checkboxSummary() {}

function styleSummary() {
  let summary = document.getElementsByClassName("summary");
  for (let text in summary.innerText) {
    if (text === "N/A") {
      text.classList.add("invalid");
    }
  }
}
