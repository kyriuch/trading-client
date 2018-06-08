import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { SharedModule } from '../shared/shared.module';
import { SingleOfferComponent } from './components/single-offer/single-offer.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ItemsService } from './services/items.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [OffersListComponent, SingleOfferComponent, AdminPanelComponent],
  providers: [ItemsService]
})
export class TradingModule { }
