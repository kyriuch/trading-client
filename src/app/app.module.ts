import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfileModule } from './modules/profile/profile.module';
import { SharedModule } from './modules/shared/shared.module';
import { TradingModule } from './modules/trading/trading.module';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ToolbarComponent,
    HomePageComponent
  ],
  imports: [
    ProfileModule,
    SharedModule,
    TradingModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
