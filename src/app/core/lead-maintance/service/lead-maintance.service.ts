import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LeadMaintanceElement } from '../models/lead-maintance.model';


@Injectable({
  providedIn: 'root',
})
export class LeadMaintanceService {

  constructor(private httpClient: HttpClient) {}

  getLeadList(): Observable<LeadMaintanceElement[]> {
    return this.httpClient.get<LeadMaintanceElement[]>(environment.baseUrl+`api/v1/csm/lead`);
  }

  createLead(lead:any): Observable<LeadMaintanceElement[]> {
     return this.httpClient.post<LeadMaintanceElement[]>(environment.baseUrl+`api/v1/csm/lead`, lead);
  }

  getLeadById(id: Number): Observable<LeadMaintanceElement> {
    return this.httpClient.get<LeadMaintanceElement>(environment.baseUrl+`api/v1/csm/lead/`+id);
  }

  updateLeadById(id: Number, lead: LeadMaintanceElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/lead/`+id, lead);
  }

  updateLeadmaintance(id: Number, lead: LeadMaintanceElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateLeadMaintance/`+id, lead);
  }

}
