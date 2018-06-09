import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FiltersDto, SearchType } from '../../models/filters.dto';
import { FiltersItemDto } from '../../models/filters-item.dto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.searchTypesString = [
      'Chcę ten przedmiot',
      'Sprzedam ten przedmiot'
    ];

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
  }

  checkItem(): void {
    const takenItem = this.itemsCtrl.value;

    if (this.items.map(x => x.itemName).indexOf(takenItem) >= 0) {
      this.itemsCtrl.setValue(this.items[this.items.map(x => x.itemName).indexOf(takenItem)].itemName);
    } else {
      this.itemsCtrl.setValue('Jakikolwiek');
    }

  }
}
