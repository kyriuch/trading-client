import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './modules/profile/components/login-page/login-page.component';
import { RegisterPageComponent } from './modules/profile/components/register-page/register-page.component';
import { AdminPanelComponent } from './modules/trading/components/admin-panel/admin-panel.component';
import { AdminGuardService } from './services/admin-guard.service';
import { GuestGuardService } from './services/guest-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
