import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LeadSourceElement } from '../models/leadSource.model';

@Injectable({
  providedIn: 'root',
})
export class LeadSourceService {

  constructor(private httpClient: HttpClient) {}

  getLeadSourceList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+`api/v1/csm/getAllLeadsource`);
  }

  createLeadSource(leadSource:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/createLeadsource`, leadSource);
  }

  getLeadSourceById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getLeadsourceById/`+id);
  }

  updateLeadSourceById(id: Number, leadSource: LeadSourceElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateLeadsource/`+id, leadSource);
  }
}
