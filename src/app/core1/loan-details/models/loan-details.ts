export class LoanDetailsElement   {
    serviceRequestId!: number
    requestType!:string
    rbiQueries!: boolean
    loanMaster!: {
        loanMasterId: number,
        loanAcctNo:string,
        customerName: string,
        pancard: string,
        mobileNumber: string,
        email: string
    }
    requests!: [
        {
            requestTypeId: number,
            reqName: string,
            tatBreached: boolean,
            tatCount: number
        }
    ]
    requestDate!: string
    requestStatus!: string
  }