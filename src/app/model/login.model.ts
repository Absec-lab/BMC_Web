export interface LoginRes {
    access_token: string
    refresh_token: string
    userdetails: Userdetail[]
  }
  
  export interface Userdetail {
    id: string
    createdTimestamp: number
    username: string
    enabled: boolean
    totp: boolean
    emailVerified: boolean
    firstName: string
    lastName: string
    email: string
    attributes: Attributes
    disableableCredentialTypes: string[]
    requiredActions: any[]
    notBefore: number
    access: Access
  }
  
  export interface Attributes {
    phoneNumber: string[]
    role: string[]
    isActive: string[]
    address2: string[]
    address1: string[]
  }
  
  export interface Access {
    manageGroupMembership: boolean
    view: boolean
    mapRoles: boolean
    impersonate: boolean
    manage: boolean
  }
  