import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CitiesElement } from '../models/cities.model';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private baseUrl = 'http://192.168.0.80:9332/';
  constructor(private httpClient: HttpClient) {}

  getCitiesList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllCity`);
  }

  createCities(cities:any): Observable<any> {

     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/addCity`, cities);
  }

  getCitiesById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getCityById/`+id);
  }

  updateCitiesById(id: Number, cities: CitiesElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateCity/`+id, cities);
  }

  getPincodeListByCityId(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getPincodeByCityId/`+id);
  }

  getAlldetailsByCityId(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAlldetailsByCityId/`+id);
  }
}
