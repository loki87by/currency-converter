import { Component } from "@angular/core";

@Component({
  selector: "footer-comp",
  template: `<footer>
    <a
      href="https://loki87by.github.io/portfolio/"
      rel="noopener noreferrer"
      target="_blank"
    >
      &copy; 2022 Алексей Акулич
    </a>
  </footer>`,
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {}
