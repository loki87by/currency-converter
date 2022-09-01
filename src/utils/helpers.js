const stringifyBigValue = num => {
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
};

export const createElement = (tagName, params, container, text) => {
  const element = document.createElement(tagName);

  if (text) {
    element.textContent = text;
  }

  Object.entries(params).forEach(param => {
    element.setAttribute(String(param[0]), String(param[1]));
  });

  if (container) {
    container.appendChild(element);
  }

  return element;
};

export function renderOptions(array, selector, target) {
  while (selector.firstChild) {
    selector.removeChild(selector.lastChild);
  }
  array.forEach(currency => {
    const option = createElement(
      "option",
      { value: currency },
      selector,
      currency
    );

    if (option.value === target) {
      option.selected = true;
    }
  });
}

export function renderTotalText(value, targetValue, currency) {
  const total = document.getElementById("total");
  total.textContent =
    value > 0
      ? `Вы получите ${stringifyBigValue(targetValue)} ${currency}`
      : "";
}

export function renderPlaceholder(currency) {
  const input = document.querySelector("input");
  input.placeholder = `Сколько у вас ${currency}`;
}
