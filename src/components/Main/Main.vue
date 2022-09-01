<template>
  <main>
    <section class="page">
      <h2>Выберите вашу валюту</h2>
      <select :value="localCurrency" @change="changeCurrency">
        <option :value="localCurrency">{{ localCurrency }}</option>
        <option
          v-for="item of basedCurrencies"
          :key="item.toLowerCase()"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
      <input
        type="number"
        v-bind:value="[baseValue > 0 ? baseValue : '']"
        v-bind:placeholder="['Сколько у вас ' + localCurrency]"
        @change="changeBaseValue"
      />
      <h2>Выберите нужную валюту</h2>
      <select :value="targetCurrency" @change="changeTargetedCurrency">
        <option :value="targetCurrency">{{ targetCurrency }}</option>
        <option
          v-for="item of targetCurrencies"
          :key="item.toLowerCase()"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
      <h3 v-if="baseValue > 0">
        Вы получите {{ stringifyBigValue(targetValue) }} {{ targetCurrency }}
      </h3>
    </section>
  </main>
</template>

<script>
import {
  getLocalCurrency,
  getRates,
  getAllCurrencies
} from '../../utils/Api.js'

export default {
  name: 'Main',
  data: function () {
    return {
      currenciesList: {},
      rates: {},
      localCurrency: '',
      targetCurrency: 'USD',
      baseValue: 0,
      targetValue: 0,
      basedCurrencies: [],
      targetCurrencies: []
    }
  },
  methods: {
    changeTargetValue: function (args) {
      const { thisValue, thisCurrency, thisRates } = args
      let currentValue = this.baseValue
      let currentCurrency = this.localCurrency
      let currentRates = this.rates

      if (thisValue) {
        currentValue = thisValue
      }

      if (thisCurrency) {
        currentCurrency = thisCurrency
      }

      if (thisRates) {
        currentRates = thisRates
      }
      const newValue =
        Math.floor((currentValue / currentRates[currentCurrency]) * 100) / 100
      this.targetValue = newValue
    },

    changeCurrency: function (e) {
      const newValue = e.target.value
      this.localCurrency = newValue
      this.changeTargetValue({ thisCurrency: this.localCurrency })
    },

    changeBaseValue: function (e) {
      const newValue = e.target.value
      this.baseValue = newValue
      this.changeTargetValue({ thisValue: newValue })
    },

    changeTargetedCurrency: function (e) {
      const newValue = e.target.value
      this.targetCurrency = newValue
      getRates(newValue).then(res => {
        this.rates = res.rates
        this.changeTargetValue({ thisRates: res.rates })
      })
    },
    stringifyBigValue: function (num) {
      const integer = Math.floor(num)
      const fraction = (Math.floor((integer - num) * 100) / 100 + '').split(
        '.'
      )
      const stringifyIntegerArray = `${integer}`.split('')

      if (stringifyIntegerArray.length < 4) {
        return num
      }
      for (let i = stringifyIntegerArray.length - 4; i >= 0; i -= 3) {
        stringifyIntegerArray[i] += ','
      }
      const intString = stringifyIntegerArray.join('')
      return `${intString}.${fraction[1]}`
    },
    init: function () {
      getRates().then(res => {
        this.rates = res.rates
      })
      getLocalCurrency().then(res => {
        this.localCurrency = res.currency
      })
      getAllCurrencies().then(res => {
        this.currenciesList = res.currencies
        this.basedCurrencies = Object.keys(res.currencies).filter(
          cur => cur !== this.localCurrency
        )
        this.targetCurrencies = Object.keys(res.currencies).filter(
          cur => cur !== this.localCurrency || this.targetCurrency
        )
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
@import url("../../styles/main.css");
</style>
