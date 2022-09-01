import { createElement } from "../utils/helpers.js";
import { SYMBOLS, ANIMATION_TIMING_FUNCTION_ARRAY } from "../utils/consts.js";

export default class Background {
  constructor(selector) {
    this.selector = selector
  }

  stringStyle = () => {
    return `font-size: ${Math.ceil(Math.random() * 5) * 2 + 5}vh;
      left: ${Math.floor(Math.random() * 90)}vw;
      top: 0;
      animation-name: rain;
      animation-duration: ${Math.ceil(Math.random() * 4) * 2 + 1}s;
      animation-timing-function:
      ${ANIMATION_TIMING_FUNCTION_ARRAY[
          Math.floor(Math.random() * ANIMATION_TIMING_FUNCTION_ARRAY.length)
        ]};
      animation-fill-mode: forwards;`
  };

  createAnimationElement(selector) {
    const element = {
      style: this.stringStyle(),
      content: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    };
    createElement("p", {style: element.style}, selector, element.content );
    this.timer(selector)
  }

  timer(selector) {
    setTimeout(() => {
      this.createAnimationElement(selector)
    }, 700)
  }

  init() {
    const background = createElement("section", {class: "background"}, this.selector);
    this.createAnimationElement(background)
  }
}