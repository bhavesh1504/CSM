import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailService {

   user = localStorage.getItem('mobile')
  constructor(private http: HttpClient) { }

  getLoanDetails(): Observable<any>{
  return this.http.get(environment.baseUrl+'api/v1/getallloandetails/'+ this.user)
  }

  getReasonMasterList(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+`api/v1/get-all-request-item`);
  }

  
  createReasonMaster(requestName:any): Observable<any> {
   let config={
      "requestType":requestName.requestType,
      "rbiQueries":requestName.rbiQueries,
      "loanMasterId":requestName.loanMasterId,
      "requestTypeId":requestName.requestTypeId
  }
  
    return this.http.post<any>(environment.baseUrl+`api/v1/add-service-request`, config);
 }

 getAllServiceRequest(): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/get-all-service-request`);
}

getReasonMasterById(id: Number): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/get-service-request/`+id);
}


}
