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

    updateTopUps(id:any,userRole:any,status:any) : Observable<any>{
      let config = {
        "assignTo": userRole,
        "status": status
      }
      return this.http.put(environment.baseUrl+'api/v1/csm/updateTopUp/'+id, config)
    }
}
