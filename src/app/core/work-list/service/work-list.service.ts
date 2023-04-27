import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { WorkListElement } from '../models/work-list.model';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class WorkListService {

  constructor(private httpClient: HttpClient) { }

  // getLeadList(): Observable<any> {
  //   return this.httpClient.get<any>(`api/v1/lead`);
  // }

  getWorkList(id: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getWorklist/` + id);
  }

  createLead(lead: any): Observable<any> {
    return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/lead`, lead);
  }

  getLeadById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/lead/` + id);
  }

  updateLeadById(id: Number, lead: WorkListElement): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/lead/` + id, lead);
  }

  updateWorklist(id: Number, lead: any): Observable<object> {
    const config = {
      "id": lead.id,
      "loanAmount": lead.loanAmount,
      "product": lead.product,
      "tenor": lead.tenor,
      "cibilScore": lead.cibilScoreLeadLoan,
      "remarkLeadLoan": lead.remarkLeadLoan,
      //"file_upload": lead.file_upload,
      "leadStatusId": lead.leadLoanStatus,
      "isEmailVerified":lead.isEmailVerified,
      "isMobileVerified":lead.isMobileVerified

      // "mobileNoVarification": lead.mobileNoVarification,
      // "emailIdVarification": lead.emailIdVarification,
    }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateWorklist/` + id, config);//
  }

  // getLeadApproval(id:any): Observable<any> {
  //   const config ={
  //     "id": id,
  // }
  //   return this.httpClient.put<any>(`api/v1/leadApproval/`+id,config);
  // }

  updateLeadmaintance(id: Number, lead: any): Observable<object> {
    var now = new Date();
    var nowDateTime = now.toISOString();
    var nowDate = nowDateTime.split('T')[0];
    var hms = lead.convenientTime;
    var target = new Date(hms);
    // console.log(now,nowDateTime,nowDate,hms,target);

    const config = {
      "lead_id": lead.id,
      "scheduleDate": lead.scheduleDate,
      "convenientTime": lead.convenientTime,
      "scheduledRemark": lead.scheduledRemark,
      "leadStatus_id": lead.leadScheduleStatus,
      "isActive": true,
      "leadStage":'Scheduled'
    }
    // return this.httpClient.put(`api/v1/updateLeadMaintance/` + id, config);
    return this.httpClient.post(environment.baseUrl+`api/v1/csm/addSchduledetails`, config);
  }

  addSchduledetails(id: Number, lead: any): Observable<object> {
    const config = {
      "lead_id": lead.id,
      "scheduleDate": lead.scheduleDate,
      "convenientTime": moment(lead.convenientTime,'HH:MM') ,
      "scheduledRemark": lead.scheduledRemark,
      "leadStatus_id": lead.leadScheduleStatus,
      "isActive": false,
      "leadStage":'New'
    }
    // return this.httpClient.put(`api/v1/updateLeadMaintance/` + id, config);
    return this.httpClient.post(environment.baseUrl+`api/v1/csm/addSchduledetails`, config);
  }

  updateLeadApproval(id: Number, lead: WorkListElement): Observable<object> {
    const config = {
      "id": lead.id,
      "leadStage": lead.leadStage,
      "rejectReason": lead.rejectReason,
      "approvedRemark": lead.approvedRemark,

      // "leadStatusId":lead.leadApprovedStatus,
      // "appId":lead.appId
      //  "leadApprovalStatus":lead.leadApprovedStatus
    }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/leadApproval/` + id, config);
  }

  updateLeadPandata(id: Number, lead: any): Observable<object> {
    const config = {
      "firstName": lead.firstName,
      "middleName": lead.middleName,
      "lastName": lead.lastName,
      "dateOfBirth": lead.dateOfBirth,
      "pan": lead.pan,
    }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateLeadPandata/` + id, config);
  }

  mobileNoVarification(id: any, lead: any): Observable<any> {
    const config = {
      "mobileNumber": lead,
    }
    return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/sendOtpToMobile/` + id, config);
  }

    mobileNoSentOTPVarification(textmassage: any, mobileNumber: any): Observable<any> {

      const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',

            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Special-Request-Header',
            'key': 'x-api-key',
            'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

        })
    };

    const config = {
      "mobile": 9819982661,
      "conset":9988
    }

    // let params = new HttpParams();
    // params = params.append('userId', 'karvyalt');
    // params = params.append('pass', 'karvyalt2');
    // params = params.append('appid', 'karvyalt');
    // params = params.append('subappid', 'karvyalt');
    // params = params.append('contenttype', '1');
    // params = params.append('to', '8482806133');
    // params = params.append('from', 'KARVYF');
    // params = params.append('text', 'is OTP 4040 to verify your lead and valid till 2 minutes. Do not share this OTP to anyone for security reason.');
    // params = params.append('selfid', 'true');
    // params = params.append('alert', '1');
    // params = params.append('dlrreq', 'true');
    // params = params.append('intflag', 'false');

    // return this.httpClient.get('https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener', {params: params,headers:httpOptions.headers});


    // return this.httpClient.post('https://testapi.karza.in/v2/mobile/otp',config)

    // const mobileNumber = lead;
    // const textmassage = ' is OTP to verify your lead and valid till 2 minutes. Do not share this OTP to anyone for security reason.';
    // const textmassage = 'Enter OTP {#var#} to login into KFSL portal which is for one time use only and within 5 minutes from the time of the request. NEVER SHARE THE OTP WITH ANYONE';

    return this.httpClient.get<any>(`https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=`+mobileNumber+`&from=KARVYF&text=`+textmassage+`&selfid=true&alert=1&dlrreq=true&intflag=false`);
  }

  mobileNoOTPVarification(id: any, lead: any): Observable<any> {
    const config = {
      "otp": lead,
    }
    return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/verifyOtpToMobile/` + id, config);
  }

  mobileOtpCheck(id:any): Observable<object> {
    return this.httpClient.post(environment.baseUrl+`api/v1/csm/sendOtpToMobile/`+id,'');
  }

  emailIdVarification(id: any, lead: any): Observable<any> {
    const config = {
      "emailNumber": lead,
    }
    return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/sendOtpToEmail/` + id, config);
  }

  emailIOTPVarification(id: any, lead: any): Observable<any> {
    const config = {
      "otp": lead,
    }
    return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/verifyOtpToEmail/` + id, config);
  }

  fileUpload(id: any, fileUpload: any): Observable<any> {
    const formData: FormData = new FormData();
    for(let i=0;i<fileUpload.length;i++){
      formData.append('file',fileUpload[i]);
    }
    return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/upload/` + id, formData,{observe: 'response',responseType: 'json'});
  }

  viewUploadFile(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/leadDocumentDownload/` + id);
  }

  getSchduleDetailsByLeadId(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getSchduleDetailsByLeadId/` + id);
  }

  getBussinessRuleEngineId(id: Number): Observable<any> {
    // return this.httpClient.post<any>(environment.baseUrl+`api/v1/bussinessRuleEngine/` + id,'');
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/bussinessRuleEngine/`+id);
  }

  getDeviationByLeadId(id: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getDeviationByLeadId/`+id);
  }

  updateDeviation(config: any): Observable<object> {
    // const config1 = {
    //   "approvedBy": approvedBy,
    //   "isApproved": isApproved,
    // }

    const config1 = {
      "vaibhav": `[`+JSON.stringify(config)+`]`
    }
    // console.log(config);
    // console.log(config1);

    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateDeviations`,config);
  }

  updateDeviation1(id:any,approvedBy:any,isApproved: any): Observable<object> {

    const config = {
      "approvedBy": approvedBy,
      "isApproved": isApproved,
    }

    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateDeviation/`+id,config);
  }

  updateDeviation2(id:any,approvedBy:any,isApproved: any,rejectedBy:any): Observable<object> {

    const config = {
      "approvedBy": approvedBy,
      "isApproved": isApproved,
      "rejectedBy": rejectedBy,
    }

    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateDeviation/`+id,config);
  }

  // NSDLVarification(id:any,approvedBy:any,isApproved: any,rejectedBy:any): Observable<object> {

  //   const config = {
  //     "approvedBy": approvedBy,
  //     "isApproved": isApproved,
  //     "rejectedBy": rejectedBy,
  //   }

  //   return this.httpClient.put(environment.baseUrl+`api/v1/updateDeviation/`+id,config);
  // }

  addPanVerificationLog(config:any): Observable<object> {

    const config1 = {
        "dobMatch":true,
        "nameMatch":false,
        "status":"Active",
        "duplicate":null,
        "leadId":111
    }
    // console.log(config);
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/addPanVerificationLog`,config);
  }

  panDetailsNew(id:any): Observable<object> {
    return this.httpClient.get(environment.baseUrl+`api/v1/csm/panDetailsNew/`+id);
  }

  nsdlPanCorsVarification(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'true',

          // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          // 'Access-Control-Allow-Headers': 'Special-Request-Header',
          // 'key': 'x-api-key',
          // 'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          'x-karza-key': 'Caji3tT5JsbndrT5',
      })
  };

  const config = {
    "pan": "BQGPA8191R",
    "consent": "Y",
    "name": "VAIBHAV SANJAY APRAJ",
    "dob": "07/02/1997"
}
  return this.httpClient.post<any>(`https://testapi.karza.in/v2/pan-authentication`,config,httpOptions);
}

  payPrintPan(): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'http://localhost:4200/',
          // 'Access-Control-Allow-Credentials': 'true',

          // 'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
          // 'Access-Control-Allow-Headers': 'Special-Request-Header,Content-Type',

          // 'key': 'x-api-key',
          // 'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          // 'x-karza-key': 'Caji3tT5JsbndrT5',

          // Access-Control-Allow-Origin: www.other.com
          // Access-Control-Allow-Methods: GET, POST, PUT, PATCH, POST, DELETE, OPTIONS
          // Access-Control-Allow-Headers: Content-Type
          // Access-Control-Max-Age: 86400

          accept: 'application/json',
           Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2NzE1MzI1NTQsInBhcnRuZXJJZCI6IlBTMDA5NjUiLCJyZXFpZCI6Ijg3NjU0MzQ1NjcifQ.ohpmVSmAb051S995PvHxd9VP51c9XKXPxOhqbtxsLyk',
           Authorisedkey:'N2U2ZTBhMThmY2VkMDJjNTAzNDgxZDc3ZmNiM2JhYTk='
      })
  };

  const config = {pannumber: 'PE95CIL06203', referenceid: '33333333'}
  return this.httpClient.post<any>('https://paysprint.in/service-api/api/v1/service/pan/verify',config,httpOptions);
}
}
