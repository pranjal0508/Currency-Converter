// Currency Converter

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdownSel = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for (select of dropdownSel) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);

        if (select.name === "from" && currCode === "USD" || select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amountEle = document.querySelector(".amount input");
    let amountVal = amountEle.value;
    if (amountVal === "" || amountVal < 0) {
        amountEle.value = 1;
        amountVal = 1;
    }

    let fromCurr = dropdownSel[0].value.toLowerCase();
    let toCurr = dropdownSel[1].value.toLowerCase();

    const URL = `${BASE_URL}${fromCurr}/${toCurr}.json`;

    const response = await fetch(URL);
    let data = await response.json();
    let exRate = data[toCurr];

    let resultAmount = amountVal * exRate;

    let resultMsg = `${amountVal} ${fromCurr.toUpperCase()} = ${resultAmount} ${toCurr.toUpperCase()}`;
    msg.innerText = resultMsg;
}

window.addEventListener("load", async () => {
    updateExchangeRate();
})