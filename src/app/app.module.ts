import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const Components = [
  ToolbarComponent,
  LoginPageComponent,
  RegisterPageComponent
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
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
