import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../profile/services/auth.service';
import { Observable } from 'rxjs';
import { OfferDto } from '../models/offer.dto';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private apiService: ApiService, private auth: AuthService) { }

  addOffer(offerDto: OfferDto) {
    return this.apiService.post(
      {
        apiEndpoint: 'offers/addoffer',
        requestBody: offerDto
      },
      true,
      this.auth.getToken()
    );
  }


}
