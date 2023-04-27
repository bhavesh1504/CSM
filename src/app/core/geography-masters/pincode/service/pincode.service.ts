import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PincodeElement } from '../models/pincode.model';

@Injectable({
  providedIn: 'root',
})
export class PincodeService {

  constructor(private httpClient: HttpClient) {}

  getPincodeList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllPincode`);
  }

  createPincode(pincode:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/addPincode`, pincode);
  }

  getPincodeById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getPincodeById/`+id);
  }

  updatePincodeById(id: Number, pincode: PincodeElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updatePincode/`+id, pincode);
  }

  getUserByPincodeId(id: Number): Observable<object> {
    return this.httpClient.get(environment.baseUrl+`api/v1/csm/getUserByPincodeId/`+id);
  }
}
