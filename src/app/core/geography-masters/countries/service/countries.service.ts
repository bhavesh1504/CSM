import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CountriesElement } from '../models/countries.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl = 'http://192.168.2.228:8080/api/v1/countries';

  constructor(private httpClient: HttpClient) {}

  getCountriesList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllCountry`);
  }

  createCountries(countries:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/addCountry`, countries);
  }

  getCountriesById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getCountryById/`+id);
  }

  updateCountriesById(id: Number, countries: CountriesElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateCountry/`+id, countries);
  }

  getStateListByCountryId(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getStateByCountryId/`+id);
  }

}
