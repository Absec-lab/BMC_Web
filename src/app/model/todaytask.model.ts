export interface TodayTaskModel {
    error: string
    code: number
    responseBody: Task[]
  }
  
  export interface Task {
    tempPitStatus: any
    pitDailyOperationstatus: any
    pitId: number
    pitName: string
    noOfDaysInTodaysTask: number
    task: string
    checkerRemarks: string
  }
  