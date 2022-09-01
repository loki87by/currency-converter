import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { BackgroundComponent } from "./background/background.component";
import { FooterComponent } from "./footer/footer.component";
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    BackgroundComponent,
    FooterComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
