import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GalgComponent } from './component/galg/galg.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { DisplayWordComponent } from './component/display-word/display-word.component';
import { KeyboardComponent } from './component/keyboard/keyboard.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { DisplayGalgComponent } from './component/display-galg/display-galg.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    GalgComponent,
    DisplayWordComponent,
    KeyboardComponent,
    DisplayGalgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
