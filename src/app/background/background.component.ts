import { Component, OnInit } from "@angular/core";
import { SYMBOLS, ANIMATION_TIMING_FUNCTION_ARRAY } from "../utils/consts";
import { BackgroundElement } from "../utils/types";

@Component({
  selector: "background-comp",
  template: `<section class="background">
    <p *ngFor="let item of arr" style="{{ item.style }}">{{ item.content }}</p>
  </section>`,
  styleUrls: ["./background.component.css"],
})
export class BackgroundComponent implements OnInit {
  arr: BackgroundElement[] = [];
  stringStyle() {
    return `
      fontSize: ${Math.ceil(Math.random() * 5) * 2 + 5}vh;
      left: ${Math.floor(Math.random() * 90)}vw;
      top: 0;
      animationName: rain;
      animationDuration: ${Math.ceil(Math.random() * 4) * 2 + 1}s;
      animationTimingFunction:
        ${
          ANIMATION_TIMING_FUNCTION_ARRAY[
            Math.floor(Math.random() * ANIMATION_TIMING_FUNCTION_ARRAY.length)
          ]
        };
      animationFillMode: forwards`;
  }
  timer() {
    setInterval(() => {
      const el = {
        style: this.stringStyle(),
        content: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      };
      this.arr.push(el);
    }, 700);
  }

  ngOnInit() {
    this.timer();
  }
}
