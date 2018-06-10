import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './modules/profile/components/login-page/login-page.component';
import { RegisterPageComponent } from './modules/profile/components/register-page/register-page.component';
import { AdminPanelComponent } from './modules/trading/components/admin-panel/admin-panel.component';
import { AdminGuardService } from './services/admin-guard.service';
import { GuestGuardService } from './services/guest-guard.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddOfferComponent } from './modules/trading/components/add-offer/add-offer.component';
import { UserGuardService } from './services/user-guard.service';
import { MyOffersComponent } from './modules/trading/components/my-offers/my-offers.component';

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
    path: 'addOffer',
    component: AddOfferComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'myOffers',
    component: MyOffersComponent,
    canActivate: [UserGuardService]
  },
  {
    path: '',
    component: HomePageComponent
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
