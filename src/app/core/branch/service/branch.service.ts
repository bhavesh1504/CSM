import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { BranchElement } from '../models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {

  constructor(private httpClient: HttpClient) {}

  getBranchList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllBranch`);
  }

  createBranch(branch:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/createBranch`, branch);
  }

  getBranchById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getBranchById/`+id);
  }

  updateBranchById(id: Number, branch: BranchElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateBranch/`+id, branch);
  }

  isMultiplePinArea(id: Number, branch: BranchElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updatePincodeByBranchId/`+id, branch);
  }
}
