const formulary = document.getElementById("formulary");
const buttonSubmit = document.getElementById("buttonSubmit");
const base2 = document.getElementById("base2");
const base10 = document.getElementById("base10");
const messageError = document.getElementById("messageError");
const numberConvert = document.getElementById("numberConvert");
const numberConverted = document.getElementById("numberConverted");
const numberConvertLabel = document.getElementById("numberConvertLabel");
const numberConvertedLabel = document.getElementById("numberConvertedLabel");

let basevalue = 0;

formulary.addEventListener("submit", function (e) {
  e.preventDefault();
});

base2.addEventListener("click", () => {
  binary();
});

base10.addEventListener("click", () => {
  decimal();
});

buttonSubmit.addEventListener("click", () => {
  convert();
});

numberConvert.addEventListener("keyup", function (e) {
  onlynumber();
  if (numberConvert.value.split(".").length > 2) {
    messageError.style.display = "block";
    numberConvert.value = `${numberConvert.value.split(".")[0]}.${
      numberConvert.value.split(".")[1]
    }`;
  }
});

function binary() {
  numberConvertLabel.innerHTML = "Binary";
  numberConvertedLabel.innerHTML = "Decimal";
  numberConvert.placeholder = "Binary number";
  numberConverted.placeholder = "Decimal number";
  messageError.innerHTML = "Only 0 and number";
  numberConvert.value = "";
  numberConverted.value = "";
  messageError.style.display = "none";
  basevalue = 0;
}

function decimal() {
  numberConvertLabel.innerHTML = "Decimal";
  numberConvertedLabel.innerHTML = "Binary";
  numberConvert.placeholder = "Decimal number";
  numberConverted.placeholder = "Binary number";
  messageError.innerHTML = "Only numbers";
  numberConvert.value = "";
  numberConverted.value = "";
  messageError.style.display = "none";
  basevalue = 1;
}

function convert() {
  let number = numberConvert.value;
  if (basevalue === 0) {
    number = numberConvert.value.split(".");
    if (number.length === 1) {
      numberConverted.value = parseInt(number, 2).toString(10);
    } else if (number.length === 2) {
      numberConverted.value = `${
        Number(parseInt(number[0], 2).toString(10)) + binaryFraction(number[1])
      }`;
    } else {
      messageError.style.display = "block";
    }
  } else if (
    basevalue === 1 &&
    (number.split(".").length === 1 || number.split(".").length === 2)
  ) {
    let number = Number(numberConvert.value);
    numberConverted.value = parseFloat(number, 10).toString(2);
  } else {
    messageError.style.display = "block";
  }
}

function onlynumber() {
  if (basevalue === 0) {
    messageError.style.display =
      numberConvert.value.replace(/[0-1, .]/g, "") === "" ? "none" : "block";
    numberConvert.value = numberConvert.value.match(/[0-1, .]/g);
    numberConvert.value = numberConvert.value.toString().replace(/[, \s]/g, "");
  } else if (basevalue === 1) {
    messageError.style.display =
      numberConvert.value.replace(/[0-9, .]/g, "") === "" ? "none" : "block";
    numberConvert.value = numberConvert.value.match(/[0-9, .]/g);
    numberConvert.value = numberConvert.value.toString().replace(/[,]/g, "");
  }
}

function binaryFraction(number) {
  numberFraction = 0;
  for (let i = 0; i < number.length; ++i) {
    let j = (i + 1) * -1;
    numberFraction += number[i] * Math.pow(2, j);
  }
  return numberFraction;
}
