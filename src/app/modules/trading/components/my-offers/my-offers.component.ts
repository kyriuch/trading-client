import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { RecentOffers } from '../../models/recent-offers';
import { ItemModel } from '../../models/item.model';
import { AuthService } from '../../../profile/services/auth.service';
import { ApiService } from '../../../../services/api.service';
import { OfferInDto } from '../../models/offer-in.dto';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  itemModels: ItemModel[];
  currentOffers: RecentOffers;
  currentPage: number;

  constructor(private apiService: ApiService,
    private auth: AuthService) { }

  ngOnInit() {
    this.currentPage = 0;

    this.apiService.get<ItemModel[]>({
      apiEndpoint: 'items/items'
    }, true, this.auth.getToken())
      .subscribe(data => {
        this.itemModels = data;
      });

    this.fetchOffers();
  }

  findImage(item: number): string {
    if (item === -1) {
      return null;
    }

    return this.itemModels.find(x => x.id === item).itemImage;
  }

  fetchOffers() {
    const body = {
      itemId: -1,
      page: this.currentPage,
      searchType: 0
    };

    this.apiService.post<RecentOffers>({
      apiEndpoint: 'offers/recentoffers',
      requestBody: body
    },
      true,
      this.auth.getToken()).subscribe(data => {
        this.currentOffers = data;
      });
  }

  filter() {
    this.currentPage = 0;
    this.fetchOffers();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.fetchOffers();
  }

  delete(item: OfferInDto) {
    this.apiService.delete(
      {
        apiEndpoint: 'offers/delete',
        id: item.offerId
      },
      true,
      this.auth.getToken()
    ).subscribe(() => {
      this.fetchOffers();
    });
  }
}
