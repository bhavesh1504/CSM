import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LeadElement } from '../models/lead.model';
// import { Lead } from '../entities/lead';

@Injectable({
  providedIn: 'root',
})
export class LeadService {

  constructor(private httpClient: HttpClient) { }

  getLeadList(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + `api/v1/csm/getLeads`);
  }

  createLead(lead: any): Observable<any> {

    const config = {
      "aadhar": lead.aadhar,
      "cityId": lead.city,
      "countryId": lead.country,
      "dateOfBirth": lead.dateOfBirth,
      "email": lead.email,
      "gender": lead.gender,
      // "id": lead.id,
      // "firstName": (lead.firstName).trim(),
      // "lastName": (lead.lastName).trim(),
      // "middleName": (lead.middleName).trim(),
      "firstName": lead.firstName,
      "lastName": lead.lastName,
      "middleName": lead.middleName,
      // "leadId": lead.leadId,
      "leadStage": lead.leadStage,
      "leadSourceId": lead.leadSource,
      "mobileNo": lead.mobileNo,
      "alternateMobileNo": lead.alternateMobileNo,
      "pan": lead.pan,
      "pincodeId": lead.postalCode,
      "stateId": lead.state,
      "userId": lead.userId,
      "createdBy": lead.createdBy,
      "area": lead.area,
      "isMobileVerified": true,
      "isActive": true
    }
    return this.httpClient.post<any>(environment.baseUrl + `api/v1/csm/lead`, config);
  }


  templead(lead: any): Observable<any> {

    const config = {
      "aadhar": lead.aadhar,
      "cityId": lead.city,
      "countryId": lead.country,
      "dateOfBirth": lead.dateOfBirth,
      "email": lead.email,
      "gender": lead.gender,
      // "id": lead.id,
      // "firstName": (lead.firstName).trim(),
      // "lastName": (lead.lastName).trim(),
      // "middleName": (lead.middleName).trim(),
      "firstName": lead.firstName,
      "lastName": lead.lastName,
      "middleName": lead.middleName,
      // "leadId": lead.leadId,
      "leadStage": lead.leadStage,
      "leadSourceId": lead.leadSource,
      "mobileNo": lead.mobileNo,
      "alternateMobileNo": lead.alternateMobileNo,
      "pan": lead.pan,
      "pincodeId": lead.postalCode,
      "stateId": lead.state,
      "userId": lead.userId,
      "createdBy": lead.createdBy,
      "area": lead.area,
      "isMobileVerified": true,
      "isActive": true
    }
    return this.httpClient.post<any>(environment.baseUrl + `api/v1/csm/templead`, config);
  }
  getLeadById(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + `api/v1/csm/lead/` + id);
  }

  updateLeadById(id: Number, lead: any): Observable<object> {
    const config = {
      "aadhar": lead.aadhar,
      "cityId": lead.city,
      "countryId": lead.country,
      "dateOfBirth": lead.dateOfBirth,
      "email": lead.email,
      "firstName": lead.firstName,
      "gender": lead.gender,
      "id": lead.id,
      "lastName": lead.lastName,
      "leadId": lead.leadId,
      "leadStage": lead.leadStage,
      "leadSource": lead.leadSource,
      "mobileNo": lead.mobileNo,
      "alternateMobileNo": lead.alternateMobileNo,
      "pan": lead.pan,
      "pincodeId": lead.postalCode,
      "stateId": lead.state,
      "userId": lead.userId,
      "createdBy": lead.createdBy,
      "area": lead.area,
      "leadStatusId": lead.leadStatus
    }
    return this.httpClient.put(environment.baseUrl + `api/v1/csm/lead/` + id, config);
  }

  autoAssignUserByRole(id: any, role: any): Observable<any> {
    const config = {
      "userId": id,
      "userRole": role,
    }
    return this.httpClient.post<any>(environment.baseUrl + `api/v1/csm/autoAssignUserByRole`, config);
  }

  sendOtpToMobile(mobileNo: any): Observable<object> {
    const config = {
      "mobileNo": mobileNo,
    }
    return this.httpClient.post(environment.baseUrl + `api/v1/csm/sendOtpToMobile/`, config);
  }

  mobileNoOTPVarification(mobileNo: any, lead: any): Observable<any> {
    const config = {
      "mobileNumber":mobileNo,
      "otp": lead,
    }
    return this.httpClient.post<any>(environment.baseUrl+`api/v1/csm/verifyOtpToMobile/`, config);
  }
}
