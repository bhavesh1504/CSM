import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment.prod';
import { RequestNameElement } from '../models/request-name';

@Injectable({
  providedIn: 'root'
})
export class RequestNameService {

  constructor(private httpClient: HttpClient){}

  getReasonMasterList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/get-all-request-type`);
  }

  createReasonMaster(requestName:any): Observable<any> {
     return this.httpClient.post<AnyCatcher>(environment.baseUrl+`api/v1/csm/add-request-type`, requestName);
  }

  getReasonMasterById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/get-request-type/`+id);
  }

  updateReasonMasterById(id: Number, reasonMaster: RequestNameElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/update-request-item/`+id, reasonMaster);
  }
}
