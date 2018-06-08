import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SingleItemDto } from '../models/single-item.dto';
import { AuthService } from '../../profile/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private apiService: ApiService, private auth: AuthService) { }

  addItem(itemDto: SingleItemDto): Observable<any> {
    return this.apiService.post({
      apiEndpoint: 'adminitems/addsingleitem',
      requestBody: itemDto
    }, true, this.auth.getToken());
  }
}
