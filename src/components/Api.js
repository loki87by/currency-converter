const apiKey = "fyhPyfOp46lGmGXaUivdBva7esLxo0A5";
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
      apikey: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(sorry);
      }
    })
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(sorry);
      }
    })
    .catch((error) => console.log("error", error));
}

export function getLocal(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b91d3843eaeb709975d89c9061d73042&units=metric&lang=en`;
  return fetch(url, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((e) => {
      return e;
    });
}
