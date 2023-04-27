import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EnquiryElement } from '../models/enquiry.model';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {

  constructor(private httpClient: HttpClient) {}

  getEnquiryList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllEnquiry`);
  }

  createEnquiry(enquiry:any): Observable<any> {
    const config ={
      // "id": enquiry.id,
      "cityId": enquiry.cityId,
      "enquiryStage": enquiry.enquiryStage,
      "enquiryStatusId": enquiry.enquiryStatusId,
      "isClosed": enquiry.isClosed,
      "firstName": enquiry.firstName,
      "lastName": enquiry.lastName,
      "middleName": enquiry.middleName,
      "loanType": enquiry.loanType,
      "mobileNo": enquiry.mobileNo,
      "pincodeId": enquiry.pincodeId,
      "product": enquiry.product,
  }
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/createEnquiry`, enquiry);
  }

  getEnquiryById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getEnquiry/`+id);
  }

  updateEnquiryById(id: Number, enquiry: EnquiryElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateEnquiry/`+id, enquiry);
  }

  autoAssignUserByRole(id:any,role:any): Observable<any> {
    const config ={
        "userId": id,
        "userRole": role,
    }
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/autoAssignUserByRole`, config);
  }

  demoNSDLPanVerificatoin(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'true',
          // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          // 'Access-Control-Allow-Headers': 'Special-Request-Header',
          'x-karza-key': 'Caji3tT5JsbndrT5',
          // 'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

      })
  };

  const config = {
    "pan": "BQGPA8191R",
    "consent": "Y",
    "name": "VAIBHAV SANJAY APRAJ",
    "dob": "07/02/1997"
  }


  // return this.httpClient.get('https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener', {params: params,headers:httpOptions.headers});


  // return this.httpClient.post('https://testapi.karza.in/v2/mobile/otp',config)

  // const mobileNumber = lead;
  // const textmassage = ' is OTP to verify your lead and valid till 2 minutes. Do not share this OTP to anyone for security reason.';
  // const textmassage = 'Enter OTP {#var#} to login into KFSL portal which is for one time use only and within 5 minutes from the time of the request. NEVER SHARE THE OTP WITH ANYONE';

  return $.post('https://testapi.karza.in/v2/pan-authentication',config,httpOptions);
}
}
