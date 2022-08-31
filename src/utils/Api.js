const apiKey = "FS3EwnYpAtshTegzGQC0MGeQZAZTC7ov";

export function getAllCurrencies() {
  return fetch("https://api.apilayer.com/currency_data/list", {
    method: "GET",
    headers: {
      apikey: apiKey,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export function getRates(currency) {
  let value = "USD";
  if (currency) {
    value = currency;
  }
  return fetch(
    `https://api.apilayer.com/exchangerates_data/latest?base=${value}`,
    {
      method: "GET",
      headers: {
        apikey: apiKey,
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export function getLocalCurrency() {
  return fetch("http://ip-api.com/json?fields=currency", {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}
