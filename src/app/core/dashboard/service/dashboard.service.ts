import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { dashboardElement } from '../models/dashboard.model';
// import { Lead } from '../entities/lead';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {}

  getLeadStatus(id:any,lead:any): Observable<any> {
    const config ={
        "statusId": lead,
    }
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/getLeadStatusCountByStatusId/`+id, config);
  }

  getEnquiryStatus(id:any,lead:any): Observable<any> {
    const config ={
        "statusId": lead,
    }
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/getEnquiryStatusCountByStatusId/`+id, config);
  }

}
