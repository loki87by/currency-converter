import { createElement, renderOptions, renderTotalText, renderPlaceholder } from "./src/utils/helpers.js";
import {
  getLocalCurrency,
  getRates,
  getAllCurrencies
} from "./src/components/Api.js";
import Background from "./src/components/Background.js";

const body = document.querySelector("body");
const background = new Background(body);
let rates = {};
let localCurrency = "";
let targetCurrency = "USD";
let baseValue = 0;
let targetValue = 0;
let allCurrencies = [];
let basedCurrencies = [];
let targetCurrencies = [];

function changeTargetValue(args) {
  const { thisValue, thisCurrency, thisRates } = args;
  let currentValue = baseValue;
  let currentCurrency = localCurrency;
  let currentRates = rates;

  if (thisValue) {
    currentValue = thisValue;
  }

  if (thisCurrency) {
    currentCurrency = thisCurrency;
  }

  if (thisRates) {
    currentRates = thisRates;
  }
  const newValue =
    Math.floor((currentValue / currentRates[currentCurrency]) * 100) / 100;
  targetValue = newValue;
  renderTotalText(baseValue, targetValue, targetCurrency)
}

function changeCurrency(e) {
  const newValue = e.target.value;
  localCurrency = newValue;
  renderPlaceholder(newValue)
  changeTargetValue({ thisCurrency: newValue });
  targetCurrencies = Object.keys(allCurrencies).filter(cur => cur !== localCurrency);
  renderOptions(targetCurrencies, targetedSelect, targetCurrency)
}

function changeBaseValue(e) {
  const newValue = e.target.value;
  baseValue = newValue;
  changeTargetValue({ thisValue: newValue });
}

function changeTargetedCurrency(e) {
  const newValue = e.target.value;
  targetCurrency = newValue;
  getRates(newValue).then(res => {
    rates = res.rates;
    changeTargetValue({ thisRates: res.rates });
  });
}

const header = createElement("header", {}, body);
createElement("h1", {}, header, "Конвертер валют");
background.init();
const page = createElement("section", { class: "page" }, body);
createElement("h2", {}, page, "Выберите вашу валюту");
const basedSelect = createElement("select", {}, page);
basedSelect.addEventListener("change", changeCurrency);
renderOptions(basedCurrencies, basedSelect, localCurrency)
const input = createElement(
  "input",
  {
    type: "number",
    value: baseValue > 0 ? baseValue : "",
    placeholder: `Сколько у вас ${localCurrency}`
  },
  page
);
input.addEventListener("input", changeBaseValue);
createElement("h2", {}, page, "Выберите нужную валюту");
const targetedSelect = createElement("select", {}, page);
targetedSelect.addEventListener("change", changeTargetedCurrency);
renderOptions(targetCurrencies, targetedSelect, targetCurrency)
createElement(
  "h3",
  {id: 'total'},
  page,
  ""
);
const footer = createElement("footer", {}, body);
createElement(
  "a",
  {
    rel: "noopener noreferrer",
    href: "https://loki87by.github.io/portfolio/",
    target: "_blank"
  },
  footer,
  "©2022 Алексей Акулич"
);

getRates()
  .then(res => {
    rates = res.rates;
  })
  .catch(err => {
    console.log(err);
  });
getLocalCurrency()
  .then(res => {
    localCurrency = res.currency;
    renderPlaceholder(res.currency)
  })
  .catch(err => {
    console.log(err);
  });
getAllCurrencies()
  .then(res => {
    allCurrencies = res.currencies
    basedCurrencies = Object.keys(res.currencies)
    renderOptions(basedCurrencies, basedSelect, localCurrency)
    targetCurrencies = Object.keys(res.currencies).filter(cur => cur !== localCurrency);
    renderOptions(targetCurrencies, targetedSelect, targetCurrency)
  })
  .catch(err => {
    console.log(err);
  });
