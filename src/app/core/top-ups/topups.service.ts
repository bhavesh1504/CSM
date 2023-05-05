import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TopupsService {

  constructor(private http: HttpClient) { }

  getTopUps() : Observable<any>{
    return this.http.get(environment.baseUrl+'api/v1/csm/getallTopUp')
    }
}
