"use strict";

const nameInput = document.getElementById("name");
const cardNumberInput = document.getElementById("card-number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");
const confirmBtn = document.querySelector(".confirm-btn");
const inputSectionInner = document.querySelector(".input-section__inner");
const btnContinue = document.querySelector(".btn-continue");
const successModal = document.querySelector(".success-modal");

function changeBorderColor(inputField, errorSelector) {
  const isEmpty = inputField.value.trim() === "";
  const borderColor = isEmpty ? "hsl(0, 100%, 66%)" : "hsl(278, 94%, 30%)";
  inputField.style.borderColor = borderColor;

  const errorElement = document.querySelector(errorSelector);
  errorElement.style.opacity = isEmpty ? 1 : 0;
}
/////////////////////////////////////////////////////////////////////////
let wasInvalidName = false;
nameInput.addEventListener("input", function () {
  const inputValue = nameInput.value;
  if (!/^[a-zA-Z ]+$/.test(inputValue)) {
    document.querySelector(".error-message__name").style.opacity = 1;
    nameInput.style.borderColor = "hsl(0, 100%, 66%)";
    wasInvalidName = true;
  } else {
    if (wasInvalidName) {
      nameInput.style.borderColor = "";
      wasInvalidName = false;
    }
    const formattedValue = inputValue.replace(/[^a-zA-Z ]/g, "");
    nameInput.value = formattedValue;
    document.querySelector(".error-message__name").style.opacity = 0;
  }
});
///////////////////////////////////////////////////////////////////////
let wasInvalidCardNumber = false;

cardNumberInput.addEventListener("input", function () {
  const originalCardValue = cardNumberInput.value;
  const inputCardValue = originalCardValue.replace(/\s+/g, "");

  const isValid = isValidCardNumber(inputCardValue);

  if (!isValid) {
    document.querySelector(".error-message__number").style.opacity = 1;
    cardNumberInput.style.borderColor = "hsl(0, 100%, 66%)";
    wasInvalidCardNumber = true;
  } else {
    if (wasInvalidCardNumber) {
      cardNumberInput.style.borderColor = "";
      wasInvalidCardNumber = false;
    }
    const numericValue = inputCardValue.match(/\d+/g).join("");
    const nonNumericValue = inputCardValue.replace(/\d+/g, "");
    const formattedNumericValue = numericValue.match(/\d{1,4}/g).join(" ");
    const formattedValue = formattedNumericValue + nonNumericValue;
    cardNumberInput.value = formattedValue;
    document.querySelector(".error-message__number").style.opacity = 0;
  }
});

function isValidCardNumber(inputValue) {
  const lastChar = inputValue[inputValue.length - 1];
  return !/\d/.test(lastChar);
}
///////////////////////////////////////////////////////////////
let wasInvalidMonth = false;
monthInput.addEventListener("input", function () {
  const originalInputValue = monthInput.value;
  const inputValue = originalInputValue.replace(/\s+/g, "");

  if (isNaN(Number(inputValue)) || originalInputValue.length !== 2) {
    document.querySelector(".error-message__monthyear").style.opacity = 1;
    monthInput.style.borderColor = "hsl(0, 100%, 66%)";
    wasInvalidMonth = true;
  } else {
    if (wasInvalidMonth) {
      monthInput.style.borderColor = "";
      wasInvalidMonth = false;
    }
    document.querySelector(".error-message__monthyear").style.opacity = 0;
  }
});
let wasInvalidYear = false;
yearInput.addEventListener("input", function () {
  const originalInputValue = yearInput.value;
  const inputValue = originalInputValue.replace(/\s+/g, "");

  if (isNaN(Number(inputValue)) || originalInputValue.length !== 2) {
    document.querySelector(".error-message__monthyear").style.opacity = 1;
    yearInput.style.borderColor = "hsl(0, 100%, 66%)";
    wasInvalidYear = true;
  } else {
    if (wasInvalidYear) {
      yearInput.style.borderColor = "";
      wasInvalidYear = false;
    }
    document.querySelector(".error-message__monthyear").style.opacity = 0;
  }
});
let wasInvalidCVC = false;
cvcInput.addEventListener("input", function () {
  const originalInputValue = cvcInput.value;
  const inputValue = originalInputValue.replace(/\s+/g, "");

  if (isNaN(Number(inputValue)) || originalInputValue.length !== 4) {
    document.querySelector(".error-message__cvc").style.opacity = 1;
    cvcInput.style.borderColor = "hsl(0, 100%, 66%)";
    wasInvalidCVC = true;
  } else {
    if (wasInvalidCVC) {
      cvcInput.style.borderColor = "";
      wasInvalidCVC = false;
    }
    document.querySelector(".error-message__cvc").style.opacity = 0;
  }
});
////////////////////////////////////////////////////////
//upperCase function
const upperCase = function (str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
////////////////////////////////////////////////////////
//clear fields function
function clearFields() {
  nameInput.value = "";
  cardNumberInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  cvcInput.value = "";
}
////////////////////////////////////////////////////
//Confirm button
confirmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    nameInput.value === "" ||
    cardNumberInput.value === "" ||
    monthInput.value === "" ||
    yearInput.value === "" ||
    cvcInput.value === ""
  ) {
    changeBorderColor(nameInput, ".error-message__name");
    changeBorderColor(cardNumberInput, ".error-message__number");
    changeBorderColor(monthInput, ".error-message__monthyear");
    changeBorderColor(cvcInput, ".error-message__cvc");
    yearInput.style.borderColor = "hsl(0, 100%, 66%)";
    return;
  } else {
    document.querySelector(".card-name__output").textContent = upperCase(
      nameInput.value
    );
    document.querySelector(".card-number__output").textContent =
      cardNumberInput.value;
    document.querySelector(
      ".card-month__output"
    ).textContent = `${monthInput.value}/${yearInput.value}`;
    document.querySelector(".card-cvc__output").textContent = cvcInput.value;
  }
  clearFields();
  inputSectionInner.classList.add("hidden");
  successModal.classList.remove("hidden");
});

btnContinue.addEventListener("click", function (e) {
  e.preventDefault();
  inputSectionInner.classList.remove("hidden");
  successModal.classList.add("hidden");
  document.querySelector(".card-name__output").textContent = "FELICIA LERIE";
  document.querySelector(".card-number__output").textContent =
    "9591 6489 6389 101E";
  document.querySelector(".card-month__output").textContent = "09/00";
  document.querySelector(".card-cvc__output").textContent = "0000";
});
