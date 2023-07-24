export interface VehicleManagementModel {
    createdBy: string
    createdDate: string
    updatedBy: any
    updatedDate: any
    vehicleId: number
    zone: Zone
    helper: Helper
    wc: Wc2
    route: Route
    driver: Driver
    vehicleNo: string
    rcNo: string
    rcPhoto: string
    vehicleImage: string
    insurance: string
    vehiclePassingWt: any
    vehicleWt: number
    vehicleDesc: string
    isActive: boolean
  }
  
  export interface Zone {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    zoneId: number
    zoneName: string
    zoneDesc: string
    isActive: boolean
  }
  
  export interface Helper {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    helperId: number
    wc: Wc
    helperName: string
    helperIdProof: string
    helperPhoto: string
    phoneNo: number
    address: string
    helperDesc: string
    isActive: boolean
  }
  
  export interface Wc {
    createdBy: string
    createdDate: string
    updatedBy: any
    updatedDate: any
    wcId: number
    zone: Zone2
    wcName: string
    wcDesc: string
    isActive: boolean
  }
  
  export interface Zone2 {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    zoneId: number
    zoneName: string
    zoneDesc: string
    isActive: boolean
  }
  
  export interface Wc2 {
    createdBy: string
    createdDate: string
    updatedBy: any
    updatedDate: any
    wcId: number
    zone: Zone3
    wcName: string
    wcDesc: string
    isActive: boolean
  }
  
  export interface Zone3 {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    zoneId: number
    zoneName: string
    zoneDesc: string
    isActive: boolean
  }
  
  export interface Route {
    createdBy: string
    createdDate: string
    updatedBy: any
    updatedDate: any
    routeId: number
    zone: Zone4
    wc: Wc3
    routeName: string
    routeDesc: string
    active: boolean
  }
  
  export interface Zone4 {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    zoneId: number
    zoneName: string
    zoneDesc: string
    isActive: boolean
  }
  
  export interface Wc3 {
    createdBy: string
    createdDate: string
    updatedBy: any
    updatedDate: any
    wcId: number
    zone: Zone5
    wcName: string
    wcDesc: string
    isActive: boolean
  }
  
  export interface Zone5 {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    zoneId: number
    zoneName: string
    zoneDesc: string
    isActive: boolean
  }
  
  export interface Driver {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    driverId: number
    wc: Wc4
    driverName: string
    driverPhoto: string
    phoneNo: string
    dlNo: string
    dlExpiry: string
    dlPhoto: string
    address: string
    dlDesc: string
    isActive: any
  }
  
  export interface Wc4 {
    createdBy: string
    createdDate: string
    updatedBy: any
    updatedDate: any
    wcId: number
    zone: Zone6
    wcName: string
    wcDesc: string
    isActive: boolean
  }
  
  export interface Zone6 {
    createdBy: string
    createdDate: string
    updatedBy: string
    updatedDate: string
    zoneId: number
    zoneName: string
    zoneDesc: string
    isActive: boolean
  }
  