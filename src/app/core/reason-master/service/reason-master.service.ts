import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment.prod';
import { ReasonMasterElement } from '../models/reason-master.model';

@Injectable({
  providedIn: 'root',
})
export class ReasonMasterService {

  constructor(private httpClient: HttpClient) {}

  getReasonMasterList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllRegion`);
  }

  createReasonMaster(reasonMaster:any): Observable<any> {
     return this.httpClient.post<AnyCatcher>(environment.baseUrl+`api/v1/csm/createRegion`, reasonMaster);
  }

  getReasonMasterById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getRegionById/`+id);
  }

  updateReasonMasterById(id: Number, reasonMaster: ReasonMasterElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateRegion/`+id, reasonMaster);
  }

}
