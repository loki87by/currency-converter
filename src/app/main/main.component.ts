import { Component, OnInit } from "@angular/core";
import { getLocal, getRates, getAllCurrencies } from "../utils/Api";
import { CurrenciesList, CurrentRates } from "../utils/types";
import { CURRENCIES_AND_COUNTRIES } from "../utils/consts";

@Component({
  selector: "main-comp",
  template: `<main>
    <div class="page">
      <h2>Выберите вашу валюту</h2>
      <select (change)="changeCurrency($event)">
        <option value="{{ localCurrency }}">{{ localCurrency }}</option>
        <option *ngFor="let item of basedCurrencies" value="{{ item }}">
          {{ item }}
        </option>
      </select>
      <input
        type="number"
        value="{{baseValue}}"
        placeholder="Сколько у вас {{ localCurrency }}"
        [(ngModel)]="baseValue"
        (input)="changeBaseValue()"
      />
      <h2>Выберите нужную валюту</h2>
      <select
        (change)="changeTargetedCurrency($event)"
      >
        <option value="{{ targetCurrency }}">{{ targetCurrency }}</option>
        <option *ngFor="let item of targetCurrencies" value="{{ item }}">
          {{ item }}
        </option>
      </select>
      <h3>
        Вы получите {{ stringifyBigValue(targetValue) }} {{ targetCurrency }}
      </h3>
    </div>
  </main>`,
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  currenciesList: CurrenciesList = {};
  rates: CurrentRates = {};
  localCurrency: string = "";
  targetCurrency: string = "USD";
  baseValue: number|string = '';
  targetValue: number = 0;
  basedCurrencies: string[] = [];
  targetCurrencies: string[] = [];

  currencyFromCountry(arg) {
    let index = CURRENCIES_AND_COUNTRIES.findIndex((item) => item[0] === arg);
    if (!index) {
      index = CURRENCIES_AND_COUNTRIES.findIndex((item) => item[1] === arg);
    }
    this.localCurrency = CURRENCIES_AND_COUNTRIES[index][2];
  }

  changeTargetValue(args) {
    const { thisValue, thisCurrency, thisRates } = args;
    let currentValue = this.baseValue;
    let currentCurrency = this.localCurrency;
    let currentRates = this.rates;

    if (thisValue) {
      currentValue = thisValue;
    } else {
      currentValue = 0;
    }

    if (thisCurrency) {
      currentCurrency = thisCurrency;
    }

    if (thisRates) {
      currentRates = thisRates;
    }
    const newValue =
      Math.floor(((currentValue as number) / currentRates[currentCurrency]) * 100) / 100;
    this.targetValue = newValue;
  }

  changeCurrency(e) {
    const newValue = e.target.value;
    this.localCurrency = newValue;
    this.changeTargetValue({ thisCurrency: this.localCurrency });
  }

  changeBaseValue() {
    this.changeTargetValue({ thisValue: this.baseValue });
  }

  changeTargetedCurrency(e) {
    const newValue = e.target.value;
    this.targetCurrency = newValue;
    getRates(newValue).then((res) => {
      this.rates = res.rates;
      this.changeTargetValue({ thisRates: res.rates });
    });
  }

  stringifyBigValue(num) {
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

  setCurrencies() {
    getRates().then((res) => {

      if (this.localCurrency === '') {
        this.localCurrency = Object.keys(res.rates)[0]
      }
      this.rates = res.rates;
    });
    getAllCurrencies().then((res) => {
      this.currenciesList = res.currencies;
    });
  }

  ngOnInit() {
    this.setCurrencies();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        getLocal(coords.latitude, coords.longitude).then((res) => {
          this.currencyFromCountry(res.sys.country);
          this.setCurrencies()
        });
      }/* ,
      function (error) {
        if (error.PERMISSION_DENIED) {
          this.setCurrencies();
        }
      }; */
    )}
  }
}
