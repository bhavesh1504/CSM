import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { RejectReasonElement } from '../models/reject-reason.model';

@Injectable({
  providedIn: 'root',
})
export class RejectReasonService {

  constructor(private httpClient: HttpClient) {}

  getRejectReasonList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/getAllRejectReason`);
  }

  createRejectReason(rejectReason:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/createRejectReason`, rejectReason);
  }

  getRejectReasonById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/getRejectReasonById/`+id);
  }

  updateRejectReasonById(id: Number, rejectReason: RejectReasonElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/updateRejectReason/`+id, rejectReason);
  }

}
