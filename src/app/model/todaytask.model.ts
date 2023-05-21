export interface TodayTaskModel {
    code: number
    responseBody: Task[]
  }
  
  export interface Task {
    pitId: number
    pitName: string
    noOfDaysInTodaysTask: number
    task: string
    checkerRemarks: string
  }
  