import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import { CURRENCIES_AND_COUNTRIES } from "../utils/consts";
import { getLocal, getRates, getAllCurrencies } from "../utils/Api";

function App() {
  const [currenciesList, setCurrenciesList] = useState({});
  const [rates, setRates] = useState({});
  const [localCurrency, setLocalCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [baseValue, setBaseValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  const geo = navigator.geolocation;

  function currencyFromCountry(arg) {
    let index = CURRENCIES_AND_COUNTRIES.findIndex((item) => item[0] === arg);

    if (!index) {
      index = CURRENCIES_AND_COUNTRIES.findIndex((item) => item[1] === arg);
    }
    setLocalCurrency(CURRENCIES_AND_COUNTRIES[index][2])
  }

  useEffect(() => {

    if (geo) {
      geo.getCurrentPosition((position) => {
        const { coords } = position;
        getLocal(coords.latitude, coords.longitude).then((res) => {
          currencyFromCountry(res.sys.country);
          getRates().then((res) => {
            setRates(res.rates);
          });
          getAllCurrencies().then((res) => {
            setCurrenciesList(res.currencies);
          });
        });
      });
    }
  }, [geo]);

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
    setTargetValue(newValue);
  }

  function changeCurrency(e) {
    const newValue = e.target.value;
    setLocalCurrency(newValue);
    changeTargetValue({ thisCurrency: newValue });
  }

  function changeBaseValue(e) {
    const newValue = e.target.value;
    setBaseValue(newValue);
    changeTargetValue({ thisValue: newValue });
  }

  function changeTargetedCurrency(e) {
    const newValue = e.target.value;
    setTargetCurrency(newValue);
    getRates(newValue).then((res) => {
      setRates(res.rates);
      changeTargetValue({ thisRates: res.rates });
    });
  }

  function stringifyBigValue(num) {
    const integer = Math.floor(num);
    const fraction = (Math.floor((integer - num) * 100) / 100 + "").split(".");
    const stringifyIntegerArray = `${integer}`.split("");

    if (stringifyIntegerArray.length < 4) {
      return num;
    }
    for (let i = stringifyIntegerArray.length - 4; i >= 0; i -= 3) {
      stringifyIntegerArray[i] += ",";
    }
    const intString = stringifyIntegerArray.join("");
    return `${intString}.${fraction[1]}`;
  }

  return (
    <>
      <Header />
      <Background />
      <section className="page">
        <h2>Выберите вашу валюту</h2>
        <select defaultValue={localCurrency} onChange={changeCurrency}>
          <option value={localCurrency}>{localCurrency}</option>
          {Object.keys(currenciesList)
            .filter((cur) => cur !== localCurrency)
            .map((currency) => (
              <option key={currency.toLowerCase()} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <input
          type="number"
          value={baseValue > 0 ? baseValue : ""}
          placeholder={`Сколько у вас ${localCurrency}`}
          onChange={changeBaseValue}
        />
        <h2>Выберите нужную валюту</h2>
        <select defaultValue={targetCurrency} onChange={changeTargetedCurrency}>
          <option value={targetCurrency}>{targetCurrency}</option>
          {Object.keys(currenciesList)
            .filter((cur) => cur !== (localCurrency || targetCurrency))
            .map((currency) => (
              <option key={currency.toLowerCase()} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        {baseValue > 0 ? (
          <h3>{`Вы получите ${stringifyBigValue(
            targetValue
          )} ${targetCurrency}`}</h3>
        ) : (
          ""
        )}
      </section>
      <Footer />
    </>
  );
}

export default App;
