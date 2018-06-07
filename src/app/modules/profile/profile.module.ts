import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';

export function init(authService: AuthService) {
  return () => authService.init();
}

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [RegisterPageComponent,
    LoginPageComponent
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER, useFactory: init, deps: [AuthService], multi: true
    }
  ]
})
export class ProfileModule { }
