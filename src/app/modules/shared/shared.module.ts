import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../profile/services/auth.service';
import { ApiService } from '../../services/api.service';

@NgModule({
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    ApiService
  ],
  declarations: []
})
export class SharedModule { }
