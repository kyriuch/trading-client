import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { ProfileModule } from './modules/profile/profile.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthService } from './modules/profile/services/auth.service';
import { TradingModule } from './modules/trading/trading.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ToolbarComponent
  ],
  imports: [
    ProfileModule,
    SharedModule,
    TradingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
