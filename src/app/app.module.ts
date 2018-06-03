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
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';

const Components = [
  ToolbarComponent,
  LoginPageComponent,
  RegisterPageComponent
];

@NgModule({
  declarations: [
    AppComponent,
    Components,
    AlertComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
