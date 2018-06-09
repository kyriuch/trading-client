import { Component, OnInit } from '@angular/core';
import { ItemSlot } from '../../models/item-slot.model';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../profile/services/auth.service';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  ownedItems: ItemSlot[] = [];
  wantedItems: ItemSlot[] = [];
  itemsToPick: ItemModel[];
  currentSelectedIndex = 0;
  currentCategory = 1;

  constructor(private apiService: ApiService, private authService: AuthService,
    private itemsService: ItemsService, private router: Router) { }

  ngOnInit() {
    for (let i = 0; i < 8; i++) {
      this.ownedItems.push({
        itemCount: 0,
        itemId: -1,
        itemImage: undefined,
        itemPaint: undefined,
        selected: false
      });

      this.wantedItems.push({
        itemCount: 0,
        itemId: -1,
        itemImage: undefined,
        itemPaint: undefined,
        selected: false
      });

      this.ownedItems[0].selected = true;
      this.currentSelectedIndex = 0;
      this.currentCategory = 1;
    }

    this.apiService.get<ItemModel[]>({
      apiEndpoint: 'items/items'
    }, true, this.authService.getToken())
      .subscribe(data => {
        this.itemsToPick = data;
      });
  }

  itemClicked(item: ItemSlot, category: number) {

    if (this.currentCategory === 1) {
      this.ownedItems[this.currentSelectedIndex].selected = false;
    } else {
      this.wantedItems[this.currentSelectedIndex].selected = false;
    }

    if (category === 1) {
      this.ownedItems[this.ownedItems.indexOf(item)].selected = true;
      this.currentSelectedIndex = this.ownedItems.indexOf(item);
    } else {
      this.wantedItems[this.wantedItems.indexOf(item)].selected = true;
      this.currentSelectedIndex = this.wantedItems.indexOf(item);
    }

    this.currentCategory = category;
  }

  pickItem(item: ItemModel) {
    if (this.currentCategory === 1) {
      this.ownedItems[this.currentSelectedIndex].itemId = item.id;
      this.ownedItems[this.currentSelectedIndex].itemImage = item.itemImage;
      this.ownedItems[this.currentSelectedIndex].selected = false;
    } else {
      this.wantedItems[this.currentSelectedIndex].itemId = item.id;
      this.wantedItems[this.currentSelectedIndex].itemImage = item.itemImage;
      this.wantedItems[this.currentSelectedIndex].selected = false;
    }

    this.currentSelectedIndex++;

    if (this.currentSelectedIndex === this.ownedItems.length) {
      this.currentSelectedIndex = 0;
      this.currentCategory = this.currentCategory === 1 ? 2 : 1;
    }

    if (this.currentCategory === 1) {
      this.ownedItems[this.currentSelectedIndex].selected = true;
    } else {
      this.wantedItems[this.currentSelectedIndex].selected = true;
    }
  }

  addOffer() {
    this.itemsService.addOffer({
      haveItemsIds: this.ownedItems.map(item => item.itemId),
      wantItemsIds: this.wantedItems.map(item => item.itemId)
    }).subscribe(data => {
      this.router.navigateByUrl('/');
    }, err => console.log);
  }
}
