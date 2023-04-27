import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserDepartmentElement } from '../models/userDepartment.model';

@Injectable({
  providedIn: 'root',
})
export class UserDepartmentService {

  constructor(private httpClient: HttpClient) {}

  getUserDepartmentList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllDepartment`);
  }

  createUserDepartment(userDepartment:any): Observable<UserDepartmentElement[]> {
     return this.httpClient.post<UserDepartmentElement[]>(environment.baseUrl+`api/v1/csm/createDepartment`, userDepartment);
  }

  getUserDepartmentById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getDepartementById/`+id);
  }

  updateUserDepartmentById(id: Number, userDepartment: UserDepartmentElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateDepartment/`+id, userDepartment);
  }

}

