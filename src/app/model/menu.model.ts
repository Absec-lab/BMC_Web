export interface UserRoleMenu {
    access_token: string
    refresh_token: string
    userdetails: Userdetail[]
    userentity: Userentity[]
    userrole: Userrole
    menuitem: Menu
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
  
  export interface Userentity {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    id: number
    userUniqueId: string
    wcEntity: WcEntity
    mccEntity: MccEntity
  }
  
  export interface WcEntity {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    wcId: number
    wcName: string
    wcDesc: string
    active: boolean
  }
  
  export interface MccEntity {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    mccId: number
    mccName: string
    mccDesc: string
    wc: Wc
    zoneId: ZoneId
    active: boolean
  }
  
  export interface Wc {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    wcId: number
    wcName: string
    wcDesc: string
    active: boolean
  }
  
  export interface ZoneId {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    zoneId: number
    zoneName: string
    zoneDesc: string
  }
  
  export interface Userrole {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    id: number
    userId: string
    name: string
    userEmail: string
  }

export type Menu = MenuList[]

export interface MenuList {
  wcName: string
  mccList: SubMenu[]
}

export interface SubMenu {
  mccName: string
  mccId: number
}
  