import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EnquiryWorklistElement } from '../models/enquiry-worklist.model';

@Injectable({
  providedIn: 'root',
})
export class EnquiryWorklistService {

  constructor(private httpClient: HttpClient) {}

  getEnquiryWorklistList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getAllEnquiry`)
    // .pipe(
    //   map(res=>{
    //     res

    //   })
    // )


    // .pipe(
    //   res=>{
    //     console.log(res);

    //   }
    // );
  }

  // .pipe(
  //   filter(val => {
  //     console.log( val.data);

  //     return val.data.assignTo.id ==this.userDetailAtoBValue?.id;
  //   }),

  createEnquiryWorklist(enquiryWorklist:any): Observable<any> {
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/createEnquiry`, enquiryWorklist);
  }

  getEnquiryWorklistById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getEnquiry/`+id);
  }

  updateEnquiryWorklistById(id: Number, enquiryWorklist: any): Observable<object> {
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/updateEnquiry/`+id, enquiryWorklist);
  }

  CloseEnquiry(id: Number): Observable<object> {
    const config ={
      "isClosed": true,
  }
    return this.httpClient.put(environment.baseUrl+`api/v1/csm/closeEnquiry/`+id, config);
  }

  autoAssignUserByRole(id:any,role:any): Observable<any> {
    const config ={
        "userId": id,
        "userRole": role,
    }
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/autoAssignUserByRole`, config);
  }

  getSchduleDetailsByEnquiryId(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl+`api/v1/csm/getSchduleDetailsByEnquiryId/` + id);
  }

  addSchduledetails(id: Number, enquiry: any): Observable<object> {

    const config = {
      "enquiryId": enquiry.id,
      "scheduleDate": enquiry.scheduleDate,
      "convenientTime": enquiry.convenientTime ,
      "scheduledRemark": enquiry.scheduledRemark,
      "enquiryStatusId": enquiry.leadScheduleStatus,
      "isActive": false,
      "enquiryStage":'New'
    }
    // return this.httpClient.put(`api/v1/updateenquiryMaintance/` + id, config);
    return this.httpClient.post(environment.baseUrl+`api/v1/csm/addSchduleDetails`, config);
  }

  ProceedSchduledetails(id: Number, enquiry: any): Observable<object> {
    // var now = new Date();
    // var nowDateTime = now.toISOString();
    // var nowDate = nowDateTime.split('T')[0];
    // var hms = enquiry.convenientTime;
    // var target = new Date(hms);
    // console.log(now,nowDateTime,nowDate,hms,target);

    const config = {
      "enquiryId": enquiry.id,
      "scheduleDate": enquiry.scheduleDate,
      "convenientTime": enquiry.convenientTime, //moment(enquiry.convenientTime,'HH:MM') ,
      "scheduledRemark": enquiry.scheduledRemark,
      "enquiryStatusId": enquiry.leadScheduleStatus,
      "isActive": true,
      "enquiryStage":'Scheduled'
    }
    return this.httpClient.post(environment.baseUrl+`api/v1/csm/addSchduleDetails`, config);
  }

  converToLead(lead:any): Observable<any> {


    // const config ={
    //     "aadhar": lead.aadhar,
    //     "cityId": lead.city,
    //     "countryId": lead.country,
    //     "dateOfBirth": lead.dateOfBirth,
    //     "email": lead.email,
    //     "firstName": lead.firstName,
    //     "gender": lead.gender,
    //     // "id": lead.id,
    //     "lastName": lead.lastName,
    //    // "leadId": lead.leadId,
    //     "leadStage": lead.leadStage,
    //     "leadSourceId": lead.leadSource,
    //     "mobileNo": lead.mobileNo,
    //     "alternateMobileNo": lead.alternateMobileNo,
    //     "pan": lead.pan,
    //     "pincodeId": lead.postalCode,
    //     "stateId": lead.state,
    //     "userId": lead.userId,
    //     "createdBy":lead.createdBy,
    //     "area":lead.area,
    //     "leadStatusId":lead.leadStatus,
    //     "product":lead.product.id
    // }
     return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/convertToLead`, lead);
  }

  panDetailsNew(id:any): Observable<object> {
    return this.httpClient.get(environment.baseUrl+`api/v1/csm/panDetailsNew/`+id);
  }
}
