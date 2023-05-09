import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoanDetailService {

  user = localStorage.getItem('mobile')
  constructor(private http: HttpClient) { }

  getLoanDetails(): Observable<any>{
  return this.http.get(environment.baseUrl+'api/v1/csm/getallloandetails/'+ this.user)
  }

  getReasonMasterList(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-all-request-item`);
  }

  
  createReasonMaster(requestName:any,loanAccNo: any,appliedBy: any,pancard: any,extraLoanAmount: any,mobileNo: any,status: any,date:any,subTypes:any,payForRequest:any): Observable<any> {
   let config={
      "requestType":requestName.requestType,
      "rbiQueries":requestName.rbiQueries,
      "loanMasterId":requestName.loanMasterId,
      "remark":requestName.remark,
      "requestTypeId":requestName.requestTypeId,
      "topUpAmount":requestName.topUpAmount,
      'payForRequest':payForRequest,
      "subTypes":subTypes,
      "topUp": {
      "loanAccNo": loanAccNo,
      "appliedBy":appliedBy,
      "pancard":pancard,
      "extraLoanAmount": extraLoanAmount,
      "mobileNo": mobileNo,
      "status": status,
      "topUpDate": date,
    
      }
  }
  
    return this.http.post<any>(environment.baseUrl+`api/v1/csm/add-service-request`, config);
 }

 getAllServiceRequest(): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-all-service-request`);
}

getReasonMasterById(id: Number): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-service-request/`+id);
}

viewUploadFile(id: Number): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/csm/download-document/` + id);
}

fileUpload(id: any, fileUpload: any): Observable<any> {
  const formData: FormData = new FormData();
  for(let i=0;i<fileUpload.length;i++){
    formData.append('file',fileUpload[i]);
  }
  
  return this.http.post<any>(environment.baseUrl+`api/v1/csm/upload-service-req-docu/` + id, formData,{observe: 'response',responseType: 'json'});
}

getLoanDetailsByAcc(id: Number): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/csm/get-service-request-by-accountno/`+id);
}

createPayment(razorPay: any,loanAcctNo: any,customerName: any,dueInstallment: any,paymentStatus: any,paymentDate: any) {
  let config={
    "transactionId":razorPay,
    "loanAccNo":loanAcctNo,
    "name":customerName,
    "amount":dueInstallment,
    "paymentStatus":paymentStatus,
    "paymentDate":paymentDate
}

  return this.http.post<any>(environment.baseUrl+`api/v1/csm/addPaymentDetails`, config);
}

createRequestPayment(razorPay: any,loanAcctNo: any,customerName: any,dueInstallment: any,paymentStatus: any,paymentDate: any,requestName: any) {
  console.log(razorPay,loanAcctNo,customerName,dueInstallment,paymentStatus,paymentDate,requestName);
  
  let config={
    "requestTransactionNo":razorPay,
    "loanNo":loanAcctNo,
    "name":customerName,
    "amount":dueInstallment,
    "paymentStatus":paymentStatus,
    "date":paymentDate,
    "requestName":requestName
}



  return this.http.post<any>(environment.baseUrl+`api/v1/csm/addRequestTransaction`, config);
}

// createTopUps(loanAccNo: any,appliedBy: any,pancard: any,extraLoanAmount: any,mobileNo: any,status: any,date:any) {
//   let config={
//     "loanAccNo": loanAccNo,
//     "appliedBy":appliedBy,
//     "pancard":pancard,
//     "extraLoanAmount": extraLoanAmount,
//     "mobileNo": mobileNo,
//     "status": status,
//     "topUpDate": date
// }

//   return this.http.post<any>(environment.baseUrl+`api/v1/csm/addTopUp`, config);
// }



followTopUps(serviceRequestId: any,followUp:any) {
  let config={
    "followUp": followUp == '' ? null: followUp
  }
  return this.http.put<any>(environment.baseUrl+`api/v1/csm/updateFollowUp/` + serviceRequestId, config);
}

getAllRequestTypeByRequestItem(itemId:any,loanAccNo:any): Observable<any> {
  return this.http.get<any>(environment.baseUrl+`api/v1/csm/getAllRequestTypeByRequestItem/` + itemId + `/` + loanAccNo);
}
}
