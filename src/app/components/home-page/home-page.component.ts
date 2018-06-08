import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FiltersDto } from '../../modules/trading/models/filters.dto';
import { PaintDto } from '../../modules/trading/models/paint.dto';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  paints: PaintDto[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get<FiltersDto>(
      {
        apiEndpoint: 'items/filters'
      }
    ).subscribe(data => {
      this.paints = data.paints;
    });
  }

}
