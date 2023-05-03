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

    const config = {
    "requestTypeId": reasonMaster.requestTypeId,
    "reqName": reasonMaster.reqName,
    "reqStatus": reasonMaster.reqStatus,
    "reqDaysRequired": reasonMaster.reqDaysRequired,
    "isPaidPopup": reasonMaster.isPaidPopup,
    "payAmount": reasonMaster.payAmount,
    "createdAt": reasonMaster.createdAt,
    "updatedAt": reasonMaster.updatedAt,
    "requestItemId": reasonMaster.requestItemId,
    "requestNameCode": reasonMaster.requestNameCode,
    "remark": reasonMaster.remark
    }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/update-request-type/`+ id, config);
  }
}
