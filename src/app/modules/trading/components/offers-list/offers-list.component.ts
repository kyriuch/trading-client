import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { PaintDto } from '../../models/paint.dto';
import { FiltersDto, SearchType } from '../../models/filters.dto';
import { CertificateDto } from '../../models/certificate.dto';
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
  paintsCtrl: FormControl = new FormControl();
  certificatesCtrl: FormControl = new FormControl();
  filteredItems: Observable<FiltersItemDto[]>;
  filteredPaints: Observable<PaintDto[]>;
  filteredCertificates: Observable<CertificateDto[]>;
  items: FiltersItemDto[];
  paints: PaintDto[];
  certificates: CertificateDto[];
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
      this.certificates = data.certificates;
      this.paints = data.paints;

      this.items.unshift({
        itemName: 'Jakikolwiek',
        id: -1
      });

      this.certificates.unshift({
        certificateName: 'Jakikolwiek',
        id: -1
      });

      this.paints.unshift({
        paintName: 'Jakikolwiek',
        id: -1
      });

      this.filteredItems = this.itemsCtrl.valueChanges.pipe(
        startWith(''),
        map(item => item ? this.items.filter(x => x.itemName.indexOf(item) >= 0) : this.items.slice())
      );

      this.filteredCertificates = this.certificatesCtrl.valueChanges.pipe(
        startWith(''),
        map(cert => cert ? this.certificates.filter(x => x.certificateName.indexOf(cert) >= 0) : this.certificates.slice())
      );

      this.filteredPaints = this.paintsCtrl.valueChanges.pipe(
        startWith(''),
        map(paint => paint ? this.paints.filter(x => x.paintName.indexOf(paint) >= 0) : this.paints.slice())
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

  checkPaint(): void {
    const takenItem = this.paintsCtrl.value;

    if (this.paints.map(x => x.paintName).indexOf(takenItem) >= 0) {
      this.paintsCtrl.setValue(this.paints[this.paints.map(x => x.paintName).indexOf(takenItem)].paintName);
    } else {
      this.paintsCtrl.setValue('Jakikolwiek');
    }

  }

  checkCertificate(): void {
    const takenItem = this.certificatesCtrl.value;

    if (this.certificates.map(x => x.certificateName).indexOf(takenItem) >= 0) {
      this.certificatesCtrl.setValue(this.certificates[this.certificates.map(x => x.certificateName).indexOf(takenItem)].certificateName);
    } else {
      this.certificatesCtrl.setValue('Jakikolwiek');
    }

  }
}
