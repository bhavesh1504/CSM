import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserElement } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://192.168.1.80:9332/';

  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<UserElement[]> {
    return this.httpClient.get<UserElement[]>(environment.baseUrl+`api/v1/csm/user`);
  }

  createUser(User:any): Observable<UserElement[]> {
     return this.httpClient.post<UserElement[]>(environment.baseUrl+`api/v1/csm/user`, User);
  }

  getUserById(id: Number): Observable<UserElement> {
    return this.httpClient.get<UserElement>(environment.baseUrl+`api/v1/csm/user/`+id);
  }

  updateUserById(id: Number, User: UserElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/user/`+id, User);
  }

  deleteUser(id: Number): Observable<object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getLoginDetails(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getLoginDetails/`+id);
  }

  updateUserPasswordById(id: Number, User:any): Observable<any> {
    const config ={
        "id": User.id,
        "password": User.newPassword
  }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateUserPassword/`+id, User);
  }

  updateUserProfileById(id: Number, User: UserElement): Observable<any> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateUserProfile/`+id, User);
  }

  resetUserPasswordId(id: Number, User:any): Observable<any> {
    const config ={
        "id": User.id,
        "newPassword": User.newPassword
  }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/resetUserPassword/`+id, config);
  }

  showAllDashboardData(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAssignedTaskCount/`+id);
  }

  showWorkListDashboardData(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAssignedTaskCount/`+id);
  }
}

