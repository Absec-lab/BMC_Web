export interface LoginModel {
    code: number
    bearerToken: string
    responseBody: UserInfo
  }
  
  export interface UserInfo {
    createdBy: string
    createdDate: string
    updatedBy: any
    updatedDate: any
    id: number
    name: string
    emailId: string
    mobileNo: number
    loginDisabled: boolean
    accountVerified: boolean
    failedLoginAttempts: number
    userRoles: any[]
    active: boolean
    mccId?:Number
    wcId?: Number
  }