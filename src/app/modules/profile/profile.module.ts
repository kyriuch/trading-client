import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [RegisterPageComponent,
    LoginPageComponent
  ],
  providers: [
    AuthService
  ]
})
export class ProfileModule { }
