import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { StatesElement } from '../models/states.model';

@Injectable({
  providedIn: 'root',
})
export class StatesService {

  constructor(private httpClient: HttpClient) {}

  getStatesList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllState`);
  }

  createStates(states:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/addState`, states);
  }

  getStatesById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getStateById/`+id);
  }

  updateStatesById(id: Number, states: StatesElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateState/`+id, states);
  }

  getCityListByStateId(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getCityByStateId/`+id);
  }

}


