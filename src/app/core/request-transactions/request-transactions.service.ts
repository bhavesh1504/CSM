import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestTransactionsService {

  constructor(private http: HttpClient) { }

  getRequestTransactions(): Observable<any>{
    return this.http.get(environment.baseUrl+'api/v1/csm/getAllRequestTransaction')
    }
}
