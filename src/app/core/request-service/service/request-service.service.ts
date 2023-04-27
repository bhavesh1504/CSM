import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  user = localStorage.getItem('mobile')
  constructor(private http: HttpClient) { }

  getLoanDetails(): Observable<any>{
  return this.http.get(environment.baseUrl+'api/v1/csm/getallloandetails/'+ this.user)
  }

  getReasonMasterList(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-all-request-item`);
  }

  
  createReasonMaster(requestName:any): Observable<any> {
   let config={
      "requestType":requestName.requestType,
      "rbiQueries":requestName.rbiQueries,
      "loanMasterId":requestName.loanMasterId,
      "requestTypeId":requestName.requestTypeId
  }
  
    return this.http.post<any>(environment.baseUrl+`api/v1/csm/add-service-request`, config);
 }

 getAllServiceRequest(): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-all-service-request`);
}

getReasonMasterById(id: Number): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-service-request/`+id);
}


fileUpload(id: any, fileUpload: any): Observable<any> {
  const formData: FormData = new FormData();
  for(let i=0;i<fileUpload.length;i++){
    formData.append('file',fileUpload[i]);
  }
  
  return this.http.post<any>(environment.baseUrl+`api/v1/csm/upload-service-req-docu/` + id, formData,{observe: 'response',responseType: 'json'});
}


}
