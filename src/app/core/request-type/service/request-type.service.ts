import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment.prod';
import { RequestTypeElement } from '../models/request-type';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  constructor(private httpClient: HttpClient){}

  getReasonMasterList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/get-all-request-item`);
  }

  createReasonMaster(requestType:any): Observable<any> {
     return this.httpClient.post<AnyCatcher>(environment.baseUrl+`api/v1/csm/add-request-item`, requestType);
  }

  getReasonMasterById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/get-request-item/`+id);
  }

  updateReasonMasterById(id: Number, reasonMaster: RequestTypeElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/update-request-item/`+id, reasonMaster);
  }
}
