import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoanTypeElement } from '../models/loanType.model';

@Injectable({
  providedIn: 'root',
})
export class LoanTypeService {

  constructor(private httpClient: HttpClient) {}

  getLoanTypeList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+`api/v1/csm/getAllLoanType`);
  }

  createLoanType(loanType:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/createLoanType`, loanType);
  }

  getLoanTypeById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getLoanType/`+id);
  }

  updateLoanTypeById(id: Number, loanType: LoanTypeElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateLoanType/`+id, loanType);
  }
}
