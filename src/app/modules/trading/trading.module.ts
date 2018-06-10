import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { SharedModule } from '../shared/shared.module';
import { SingleOfferComponent } from './components/single-offer/single-offer.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ItemsService } from './services/items.service';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { OfferSlotComponent } from './components/offer-slot/offer-slot.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    OffersListComponent
  ],
  declarations: [
    OffersListComponent,
    SingleOfferComponent,
    AdminPanelComponent,
    AddOfferComponent,
    OfferSlotComponent,
    MyOffersComponent
  ],
  providers: [ItemsService]
})
export class TradingModule { }
