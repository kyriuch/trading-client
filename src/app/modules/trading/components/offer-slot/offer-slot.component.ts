import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offer-slot',
  templateUrl: './offer-slot.component.html',
  styleUrls: ['./offer-slot.component.scss']
})
export class OfferSlotComponent implements OnInit {

  @Input() selected: boolean;
  @Input() imageString: string;

  constructor() { }

  ngOnInit() {
  }

}
