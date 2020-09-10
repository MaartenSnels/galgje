import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RandomWordComponent } from './component/randomWord/random-word.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { DisplayWordComponent } from './component/display-word/display-word.component';
import { KeyboardComponent } from './component/keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomWordComponent,
    DisplayWordComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
