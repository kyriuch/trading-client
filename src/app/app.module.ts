import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const Components = [
  ToolbarComponent,
  LoginPageComponent
];

@NgModule({
  declarations: [
    AppComponent,
    Components
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
