import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AreasElement } from '../models/areas.model';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private baseUrl = 'http://192.168.2.228:8080/api/v1/areas';

  constructor(private httpClient: HttpClient) {}

  getAreasList(): Observable<AreasElement[]> {
    return this.httpClient.get<AreasElement[]>(environment.baseUrl+`api/v1/csm/areas`);
  }

  createAreas(areas:any): Observable<AreasElement[]> {
     return this.httpClient.post<AreasElement[]>(environment.baseUrl+`api/v1/csm/areas`, areas);
  }

  getAreasById(id: Number): Observable<AreasElement> {
    return this.httpClient.get<AreasElement>(environment.baseUrl+`api/v1/csm/areas/`+id);
  }

  updateAreasById(id: Number, areas: AreasElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/areas/`+id, areas);
  }

  deleteAreas(id: Number): Observable<object> {
    return this.httpClient.delete(environment.baseUrl+`${this.baseUrl}/${id}`);
  }
}
