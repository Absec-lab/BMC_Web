import { Component } from '@angular/core';
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
    wcId: Number;
  } = { mccId: 0, wcId: 0 };

  userInfo: UserInfo | undefined;

  taskList: Task[] = [];

  pitStatusArr: PitStatusObj[] = [];

  constructor(private pitService: PitService, private confrimDialog: ConfirmDialogService) {
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') ?? "");
    this.todayViewtaskPayload.mccId = this.userInfo?.mccId ?? 1;
    this.todayViewtaskPayload.wcId = this.userInfo?.wcId ?? 1;

    forkJoin([this.pitService.getTodayTaskList(this.todayViewtaskPayload),
    this.pitService.getAllPitStatus()]).subscribe(([taskResponse, pitStatusResponse]) => {
      if (pitStatusResponse.code == 202) {
        this.pitStatusArr = pitStatusResponse.responseBody;
      } else {

      }
      if (taskResponse.code == 202) {
        this.taskList = taskResponse.responseBody;
      } else {

      }
    });
  }

  onStatusSelect(ev: any, task: Task) {
    console.log(ev.target.value);
    this.confrimDialog.confirm('Confirm', `Please confirm to change the status of ${task.task}`, 'Confirm', 'cancel').then((status) => {
      if (status) {
        this.updateStatus(ev.target.value, task.pitId);
      } else {

      }
    })
  }

  onStatusSelect1(ev: any) {
    this.confrimDialog.confirm('Confirm', 'Pleaase confirm to change the status of ', 'Ok', 'cancel').then((status) => {
      console.log(status)
      if (status) {

      } else {

      }
    })
  }

  updateStatus(operationStatus: Number, pitId: Number) {
    this.pitService.updatePitStatus({ operationStatus: operationStatus, pitId: pitId }).subscribe((response: { code: Number; message: string; }) => {
      if (response.code == 202) {

      } else {

      }
    })
  }
}
