import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProductMasterElement } from '../models/ProductMaster.model';

@Injectable({
  providedIn: 'root',
})
export class ProductMasterService {

  constructor(private httpClient: HttpClient) {}

  getProductMasterList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+`api/v1/getAllProduct`);
  }

  createProductMaster(productMaster:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/createProduct`, productMaster);
  }

  getProductMasterById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/getProduct/`+id);
  }

  updateProductMasterById(id: Number, productMaster: ProductMasterElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/updateProduct/`+id, productMaster);
  }
}
