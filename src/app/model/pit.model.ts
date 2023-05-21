export interface PitModel {
    code: number
    responseBody: ResponseBody[]
  }
  
  export interface ResponseBody {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    pitId: number
    pitUniqueId: string
    pitName: string
    wc: Wc
    mcc: Mcc
    pitStatus: PitStatus
    batch: number
    pitDesc: string
    pitCndSts: boolean
    pitCndStsStDt: string
    pitCndStsEndDt: string
    pitCndRemarks: any
    pitUserConfirm: boolean
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
  
  export interface Mcc {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    mccId: number
    mccName: string
    mccDesc: string
    wc: Wc2
    zoneId: ZoneId
    active: boolean
  }
  
  export interface Wc2 {
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
  
  export interface PitStatus {
    pitConfigId: number
    pitConfigCode: string
    activityDesc: string
    minDay: number
    maxDay: number
    activityMsg: string
    activityColr: string
    isNotfEnable: number
    isEventNeeded: boolean
    releaseAction: string
    isHoldForScheduler: boolean
    holdForScheduler: boolean
  }


