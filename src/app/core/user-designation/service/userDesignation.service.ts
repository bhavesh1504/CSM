import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserDesignationElement } from '../models/userDesignation.model';

@Injectable({
  providedIn: 'root',
})
export class UserDesignationService {
  private baseUrl = 'http://192.168.2.228:8080/api/v1/userDesignation';

  constructor(private httpClient: HttpClient) {}

  getUserDesignationList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllDesignation`);
  }

  createUserDesignation(userDesignation:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/addDesignation`, userDesignation);
  }

  getUserDesignationById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getDesignationById/`+id);
  }

  updateUserDesignationById(id: Number, userDesignation: UserDesignationElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateDesignation/`+id, userDesignation);
  }
}
