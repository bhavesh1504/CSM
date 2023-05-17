import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoanMasterService {

  constructor(private http:HttpClient) { }

  fileUpload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name)
    return this.http.post<any>(environment.baseUrl+`api/v1/csm/loan-details/bulk-upload`,formData);
  }

  getLoanMaster(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-all-audit-loan-master`);
  }

  getLoanMasters(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-all-loan-master`);
  }


}
