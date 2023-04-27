import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ManualAssignmentElement } from '../models/manual-assignment.model';


@Injectable({
  providedIn: 'root',
})
export class ManualAssignmentService {

  constructor(private httpClient: HttpClient) {}

  getLeadList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getLeads`);
  }

  createLead(lead:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/lead`, lead);
  }

  getLeadById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/lead/`+id);
  }

  updateLeadById(id: Number, lead: any): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/lead/`+id, lead);
  }

  updateManuualAssignment(id: Number, lead: any): Observable<object> {
    const config ={
      "userId": lead.userId,
  }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/mannualAssignment/`+id, config);
  }

  updateLeadApproval(id: Number, lead: any): Observable<object> {
    const config ={
      "id": lead.id,
      "leadStatus": lead.leadStatus,
      "rejectReason": lead.rejectReason,
      "approvedRemark": lead.approvedRemark,
  }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/leadApproval/`+id, config);
  }

  getAllUserForManualAssgment(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/mannualAssignmentUserList/`+id);
  }
}

function res(this: (any: any) => void, value: any, index: number): value is any {
  throw new Error('Function not implemented.');
}

