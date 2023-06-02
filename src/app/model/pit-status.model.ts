export interface PitStatusModel {
    code: number
    responseBody: PitStatusObj[]
  }
  
  export interface PitStatusObj {
    id: number
    statusName: string
    statusCode: string
    entity: Entity
  }
  
  export interface Entity {
    id: number
    entityName: string
    isActive: boolean
  }
  