import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FiltersDto, SearchType } from '../../models/filters.dto';
import { FiltersItemDto } from '../../models/filters-item.dto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';
import { AuthService } from '../../../profile/services/auth.service';
import { RecentOffers } from '../../models/recent-offers';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  itemsCtrl: FormControl = new FormControl();
  filteredItems: Observable<FiltersItemDto[]>;
  items: FiltersItemDto[];
  searchTypesString: string[];
  pickedSearch: string;
  itemModels: ItemModel[];
  currentOffers: RecentOffers;
  currentPage: number;

  constructor(private apiService: ApiService, private itemsService: ItemsService,
    private auth: AuthService) { }

  ngOnInit() {
    this.currentPage = 0;

    this.searchTypesString = [
      'Jakikolwiek',
      'Chcę ten przedmiot',
      'Sprzedam ten przedmiot'
    ];

    this.pickedSearch = 'Jakikolwiek';
    this.itemsCtrl.setValue('Jakikolwiek');

    this.apiService.get<FiltersDto>(
      {
        apiEndpoint: 'items/filters'
      }
    ).subscribe(data => {
      this.items = data.items;

      this.items.unshift({
        itemName: 'Jakikolwiek',
        id: -1
      });

      this.filteredItems = this.itemsCtrl.valueChanges.pipe(
        startWith(''),
        map(item => item ? this.items.filter(x => x.itemName.indexOf(item) >= 0) : this.items.slice())
      );
    });

    this.apiService.get<ItemModel[]>({
      apiEndpoint: 'items/items'
    }, true, this.auth.getToken())
      .subscribe(data => {
        this.itemModels = data;
      });

    this.fetchOffers();
  }

  checkItem(): void {
    const takenItem = this.itemsCtrl.value;

    if (this.items.map(x => x.itemName).indexOf(takenItem) >= 0) {
      this.itemsCtrl.setValue(this.items[this.items.map(x => x.itemName).indexOf(takenItem)].itemName);
    } else {
      this.itemsCtrl.setValue('Jakikolwiek');
    }
  }

  findImage(item: number): string {
    if (item === -1) {
      return null;
    }

    return this.itemModels.find(x => x.id === item).itemImage;
  }

  fetchOffers() {
    const body = {
      itemId: this.itemsCtrl.value === 'Jakikolwiek' ? -1 : this.itemModels.find(x => x.itemName === this.itemsCtrl.value).id,
        page: this.currentPage,
        searchType: this.searchTypesString.indexOf(this.pickedSearch)
    };

    this.apiService.post<RecentOffers>({
      apiEndpoint: 'offers/recentoffers',
      requestBody: body
    }).subscribe(data => {
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
}
