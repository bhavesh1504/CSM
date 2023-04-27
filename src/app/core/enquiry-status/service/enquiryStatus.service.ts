import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EnquiryStatusElement } from '../models/enquiryStatus.model';

@Injectable({
  providedIn: 'root',
})
export class EnquiryStatusService {

  constructor(private httpClient: HttpClient) {}

  getEnquiryStatusList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+`api/v1/csm/getAllEnquiryStatus`);
  }

  createEnquiryStatus(enquiryStatus:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/createEnquiryStatus`, enquiryStatus);
  }

  getEnquiryStatusById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getEnquiryStatusById/`+id);
  }

  updateEnquiryStatusById(id: Number, enquiryStatus: any): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateEnquiryStatus/`+id, enquiryStatus);
  }
}
