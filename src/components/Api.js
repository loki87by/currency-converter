const apiKey = "8Iv0t8apaL2xQPIA3lISZHbz3H6VsN90";
const sorry = `Сайт работает в ознакомительном режиме.
  В связи с этим есть ограничения по количеству запросов к информационным службам.
  Если вы вы видите это сообщение значит превышено дневное/месячное ограничение запросов.
  Будьте добры сообщить о неполадках разработчику.
  Приносим извинения за временные неудобства.
  Можете попробовать запустить страницу спустя сутки.
  Спасибо за внимание.`;

export function getAllCurrencies() {
  return fetch("https://api.apilayer.com/currency_data/list", {
    method: "GET",
    headers: {
      apikey: apiKey
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert(sorry);
      }
    })
    .catch(error => console.log("error", error));
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
        apikey: apiKey
      }
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert(sorry);
      }
    })
    .catch(error => console.log("error", error));
}

export function getLocalCurrency() {
  return fetch("http://ip-api.com/json?fields=currency", {
    method: "GET"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert(sorry);
      }
    })
    .catch(error => console.log("error", error));
}
