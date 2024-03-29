import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { PitStatusObj } from 'src/app/model/pit-status.model';
import { PitStatus } from 'src/app/model/pit.model';
import { Task, TodayTaskModel } from 'src/app/model/todaytask.model';
import { UserInfo } from 'src/app/model/user.model';
import { ConfirmDialogService } from 'src/app/service/confrim-dialog/confirm-dialog.service';
import { PitService } from 'src/app/service/pit.service';

@Component({
  selector: 'app-today-task',
  templateUrl: './today-task.component.html',
  styleUrls: ['../../../common.css', './today-task.component.css']
})
export class TodayTaskComponent {

  todayViewtaskPayload: {
    mccId: Number;
  } = { mccId: 0};

  userInfo: UserInfo | undefined;

  remarks:string=''

  taskList: Task[] = [];

  pitStatusArr: PitStatusObj[] = [];

  taskStatus: any;

  constructor(private pitService: PitService, private confrimDialog: ConfirmDialogService, private ref: ChangeDetectorRef , public toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(' -------------  INSIDE TODAYS TASK MCC PIT  ----------------    ');
    this.userInfo = JSON.parse(JSON.stringify(localStorage.getItem('userInfo')) ?? "");
    this.todayViewtaskPayload.mccId = this.userInfo?.mccId ?? 1;
    forkJoin([this.pitService.getTodayTaskList(this.todayViewtaskPayload),
    this.pitService.getAllPitStatus()]).subscribe(([taskResponse, pitStatusResponse]) => {
      console.log('pitStatusResponse   {} ',pitStatusResponse);
      console.log('taskResponse   {} ',taskResponse);
      if (pitStatusResponse.code == 202) {
        this.pitStatusArr.push({
          entity: {
            entityName: "",
            id: 0,
            isActive: true,
          },
          id: 0,
          statusCode: '--Select status--',
          statusName: "--Select status--"
        })
        this.pitStatusArr.push(...pitStatusResponse.responseBody);
        if (this.taskList.length > 0) {
          this.ref.detectChanges();
        }
      } else {

      }
      if (taskResponse.code == 202) {
        this.taskList = taskResponse.responseBody;
        this.taskList.map((ele) => ele.tempPitStatus = ele.pitDailyOperationstatus);
      } else {
        console.log(taskResponse)
        this.confrimDialog.confirm('Error', taskResponse.error ?? "Internal server error", "Dismiss");
      }
    });
  }


  onStatusSelect(ev: any, task: Task) {
    if (ev.target.value != 0) {
      this.confrimDialog.confirm('Confirm', `You are about to update the record with no comments. Please confirm to change the status of ${task.task} without remarks or cancel to resubmit with remarks.`, 'Confirm', 'cancel', "lg").then((status) => {
        if (status) {
          task.tempPitStatus = ev.target.value;
          this.updateStatus(ev.target.value, task);
        } else { 
          task.pitDailyOperationstatus = task.tempPitStatus as number ?? 0;
          this.ref.detectChanges();
        }
      })
    }
  }

  updateStatus(operationStatus: Number, task: Task) {
    this.pitService.updatePitStatus({ operationStatus: operationStatus, pitId: task.pitId, remarks: task.checkerRemarks }).subscribe((response: { code: Number; message: string; }) => {
      if (response.code == 202) {
        this.toastr.success('',response.message , {positionClass:'toast-center-center'});
      } else {
        this.toastr.error('','Failed to update' , {positionClass:'toast-center-center'});
      }
    })
  }
}
