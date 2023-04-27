import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { RoleElement } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = 'http://192.168.2.228:8080/api/v1/role';

  constructor(private httpClient: HttpClient) {}

  getRoleList(): Observable<RoleElement[]> {
    return this.httpClient.get<RoleElement[]>(environment.baseUrl+`api/v1/csm/role`);
  }

  createRole(role:any): Observable<RoleElement[]> {
     return this.httpClient.post<RoleElement[]>(environment.baseUrl+`api/v1/csm/role`, role);
  }

  getRoleById(id: Number): Observable<RoleElement> {
    return this.httpClient.get<RoleElement>(environment.baseUrl+`api/v1/csm/role/`+id);
  }

  updateRoleById(id: Number, role: RoleElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/role/`+id, role);
  }

  deleteRole(id: Number): Observable<object> {
    return this.httpClient.delete(environment.baseUrl+`${this.baseUrl}/${id}`);
  }
}
