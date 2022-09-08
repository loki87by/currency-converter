import {
  createElement,
  renderOptions,
  renderTotalText,
  renderPlaceholder,
} from "./src/utils/helpers.js";
import { getRates, getAllCurrencies, getLocal } from "./src/components/Api.js";
import { CURRENCIES_AND_COUNTRIES } from "./src/utils/consts.js";
import Background from "./src/components/Background.js";

const geo = navigator.geolocation;
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

function currencyFromCountry(arg) {
  let index = CURRENCIES_AND_COUNTRIES.findIndex((item) => item[0] === arg);
  if (!index) {
    index = CURRENCIES_AND_COUNTRIES.findIndex((item) => item[1] === arg);
  }
  renderPlaceholder(CURRENCIES_AND_COUNTRIES[index][2]);
  localCurrency = CURRENCIES_AND_COUNTRIES[index][2];
}

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
  renderTotalText(baseValue, targetValue, targetCurrency);
}

function changeCurrency(e) {
  const newValue = e.target.value;
  localCurrency = newValue;
  renderPlaceholder(newValue);
  changeTargetValue({ thisCurrency: newValue });
  targetCurrencies = Object.keys(allCurrencies).filter(
    (cur) => cur !== localCurrency
  );
  renderOptions(targetCurrencies, targetedSelect, targetCurrency);
}

function changeBaseValue(e) {
  const newValue = e.target.value;
  baseValue = newValue;
  changeTargetValue({ thisValue: newValue });
}

function changeTargetedCurrency(e) {
  const newValue = e.target.value;
  targetCurrency = newValue;
  getRates(newValue).then((res) => {
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
renderOptions(basedCurrencies, basedSelect, localCurrency);
const input = createElement(
  "input",
  {
    type: "number",
    value: baseValue > 0 ? baseValue : "",
    placeholder: `Сколько у вас ${localCurrency}`,
  },
  page
);
input.addEventListener("input", changeBaseValue);
createElement("h2", {}, page, "Выберите нужную валюту");
const targetedSelect = createElement("select", {}, page);
targetedSelect.addEventListener("change", changeTargetedCurrency);
renderOptions(targetCurrencies, targetedSelect, targetCurrency);
createElement("h3", { id: "total" }, page, "");
const footer = createElement("footer", {}, body);
createElement(
  "a",
  {
    rel: "noopener noreferrer",
    href: "https://loki87by.github.io/portfolio/",
    target: "_blank",
  },
  footer,
  "©2022 Алексей Акулич"
);

function setCurrencies(init) {
  getRates().then((res) => {
    rates = res.rates;

    if (init) {
      renderPlaceholder(Object.keys(res.rates)[0]);
    }
    getAllCurrencies().then((res) => {
      allCurrencies = res.currencies;
      basedCurrencies = Object.keys(res.currencies);
      renderOptions(basedCurrencies, basedSelect, localCurrency);
      targetCurrencies = Object.keys(res.currencies).filter(
        (cur) => cur !== localCurrency
      );
      renderOptions(targetCurrencies, targetedSelect, targetCurrency);
    });
  });
}

setCurrencies(true);

if (geo) {
  geo.getCurrentPosition(
    (position) => {
      const { coords } = position;
      getLocal(coords.latitude, coords.longitude).then((res) => {
        currencyFromCountry(res.sys.country);
        setCurrencies();
      });
    },
    function (error) {
      if (error.PERMISSION_DENIED) {
        setCurrencies(true);
      }
    }
  );
}
