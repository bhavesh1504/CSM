import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LeadStatusElement } from '../models/leadStatus.model';

@Injectable({
  providedIn: 'root',
})
export class LeadStatusService {

  constructor(private httpClient: HttpClient) {}

  getLeadStatusList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+`api/v1/csm/getAllLeadStatus`);
  }

  createLeadStatus(leadStatus:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/createLeadStatus`, leadStatus);
  }

  getLeadStatusById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getLeadStatusById/`+id);
  }

  updateLeadStatusById(id: Number, leadStatus: LeadStatusElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateLeadStatus/`+id, leadStatus);
  }
}
