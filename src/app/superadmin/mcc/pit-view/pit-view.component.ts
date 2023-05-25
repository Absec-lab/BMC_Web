import { Component } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { PitInitModalReq, PitModel, PitStageBody, PitStageRoot } from 'src/app/model/pit.model';
import { SubmitWorkflowPayload, UpdatePitStatusPayload } from 'src/app/model/pitInit.model';
import { ModalService } from 'src/app/service/modal.service';
import { PitService } from 'src/app/service/pit.service';
import { ModalComponent } from 'src/app/superadmin/mcc/pit-view/modal/modal.component';


@Component({
  selector: 'app-pit-view',
  templateUrl: './pit-view.component.html',
  styleUrls: ['../../../common.css', './pit-view.component.css']
})
export class PitViewComponent {

  private updateSubscription: Subscription | undefined;
  pitmodalstatus : any = false;
  public inertMaterialVal:any=0.0;
  public jsonObject: any = {};
  public mapInput = new Map<any,any>();
  public responseforWorkflowstart : any;
  public activityModal : any =false;
  public activeNotification :any = '';
  public actionRequired:any=false;
  public clickedPitId : any=0;
  public clickedPit : any;
  public toPitToMixedUp : any=0;
  public activityMixedUpModal : any = false;
  public yellowPitarr : any[] = [];
  public pitClicked : any='';
  public responseBodyT: PitStageBody = {
    filledUpDate: '',
    firstDayMixedUp: '',
    firstTurnDate: '',
    secondTurnDate: '',
    compostingDate: ''
  }
  public allPitStages : PitStageRoot = {
    message: '',
    code: 0,
    responseBody: this.responseBodyT
  };
  public yellowPitModel : any = {
    "pitId":0,
    "pitName":""
  };
  allPitbyMcc : PitModel = {
     code: 0,
     responseBody: []
   }
 
   tabName: string = 'Pit View';
   showPitTabView: boolean = true;
   showTodayTaskView:boolean = false;
   commondialog:boolean =true;

   displayPopover() {
    const popoverItem = document.querySelector('.popover-item') as HTMLDivElement;
    popoverItem.classList.toggle('show');
  }

  public submitToWorkflowPayload: SubmitWorkflowPayload = {
   payload:{
     wcId: 1,
     mccId: '1',
     pitId: '0',
     pitProcessStatus: '1',
     isFilledup: true
   }
  }
  public updatePitStatusPayload: UpdatePitStatusPayload =   {
    payload: {
      pitId: '',
      pitStatus: '',
      pitFrom: '',
      pitTo: ''
    }
    
  }

  public pitInitModalReq : PitInitModalReq = {
    pitid: 0,
    segregation: false,
    shreding: false,
    visualinspection: false,
    mixedenzyme: '',
    pitfillupstatus: '',
    filledGarbageWt: '',
    dateOfFirstFilling: '',
    filledgardbagewt: '',
    firstTurnDate: '',
    dateOfFirstMixedup: '',
    inertMaterialMxedQty: '',
    cocopeatMixedQty: '',
    secondTurnDate: '',
    totalCompostGen: '',
    compostDate: ''
  }

  
  constructor(private pitService: PitService,
    protected modalService: ModalService
   ) {
   
  }

  ngOnInit(): void {
    this.onRefresh();
    this.getPitStageDetails();
    this.updateSubscription = interval(30000).subscribe(
      (val) => { this.onRefresh()});

  }

  onRefresh(){
    this.pitService
      .getAllPitsByMcc()
      .subscribe((response) => (this.allPitbyMcc = response));
  }

  getPitStageDetails(){
    this.pitService
      .getAllPitStagesStatus()
      .subscribe((response) => (this.allPitStages = response));
  }

  onAlertClick(){
    this.convertMaptoJson();
    this.modalService.close();
  }

  onSubmitRequestForInit(){
    this.setterDataToMap(this.getterMap() , 'inertMaterial' , this.inertMaterialVal);
    let pitInitReqForEnzyme = this.convertMaptoJson();
    console.log('Request Send before Enzyme process.{} ',pitInitReqForEnzyme);
    this.pitService
      .savePitInitForCompost(pitInitReqForEnzyme)
      .subscribe((response) => (this.allPitbyMcc = response));
      console.log('Successs Saved Enzyme process.');
    
      this.closePitmodalstatus();
      this.onSubmitToWorkflow();
      this.closePitActivityModalstatus();
  }


  onSubmitToWorkflow(){
    console.log('Request Send before Submit to Workflow process.{} ',this.submitToWorkflowPayload);
    console.log('Clicked pit ID  ', this.clickedPitId);
    this.submitToWorkflowPayload.payload.pitId= this.clickedPitId;
    this.pitService
      .submitRequestForBatchBeforeCompost(this.submitToWorkflowPayload)
      .subscribe((response) => (this.responseforWorkflowstart = response));
      console.log('Now Workflow process started');
      alert('Successsfully Saved.. Now Composting process started');
      this.onRefresh();
  }

    /**
   * Function onActiveStatusChange
   * @param evt 
   */
    public onActiveStatusChange(evt: any,action: any) {
      console.log(evt.target.value);
      evt.target.value == 'on' ? this.mapInput.set(action,true) : this.mapInput.set(action,false);
      console.log('Mapintput for enzyme : {} ',this.mapInput);
    }

    public convertMaptoJson() : String{
      this.mapInput.forEach((value, key) => {
        this.jsonObject[key] = value;
      });
      console.log(JSON.stringify(this.jsonObject));
      let jsonReq = JSON.stringify(this.jsonObject);
      return jsonReq;
    }

    public setterDataToMap(inMap : any, key : String , value :String) : any{
      inMap.set(key , value);
      return inMap;
    }
   
    private getterMap() : any{
         return this.mapInput;
    }

    public showPitmodalstatus(pit : any) {
      console.log(" On alett click ",pit);
      this.activeNotification = pit.pitStatus.activityMsg;
      this.clickedPitId = pit.pitId;
      this.actionRequired = pit.pitStatus.isEventNeeded;
      this.clickedPit = pit;
     if(pit.pitStatus.pitConfigCode == "PIT_EMPTY_GARBAGE_COL_NOT_STARTED"){
      this.pitmodalstatus = true;
      this.activityModal = false;
      this.activityMixedUpModal = false;
     }else if(pit.pitStatus.pitConfigCode == "PIT_GARBAGE_COLLECT"){
      this.pitmodalstatus = true;
      this.activityModal = false;
      this.activityMixedUpModal = false;
     }else if(pit.pitStatus.pitConfigCode == "PIT_EMPTY_AFTER_MIXED_UP"){
      this.pitmodalstatus = false;
      this.activityModal = true;
      this.activityMixedUpModal = false;
     }else if(pit.pitStatus.pitConfigCode == "PIT_COMPOST_DONE"){
      this.pitmodalstatus = false;
      this.activityModal = true;
      this.activityMixedUpModal = false;
     }else if(pit.pitStatus.pitConfigCode == "PIT_STATUS_MIXUP_6_8D_COMPLETE"){
      this.openPitMixedUpModalstatus();
      this.pitmodalstatus = false;
      this.activityModal = false;
     }else if(pit.pitStatus.isNotfEnable == 1 ){
      this.activityMixedUpModal = false;
      this.pitmodalstatus = false;
      this.activityModal = true;
     }
     
     if(pit.pitStatus.isEventNeeded == true){
      this.getSelectedPit(pit,false);
     }
     this.getPitStageDetails();
      console.log(" On showPitmodalstatus  Notification ",this.activeNotification);
      console.log(" On showPitmodalstatus  clickedPitId ",this.clickedPitId);
    }

    public closemodal(){
      this.commondialog = false;
    }
  
    public closePitmodalstatus() {
      this.pitmodalstatus = false;
    }

    public closePitActivityModalstatus() {
      this.activityModal = false;
    }

    public openPitActivityModalstatus() {
      this.activityModal = true;
    }

    public closePitMixedUpModalstatus() {
      this.activityMixedUpModal = false;
      this.yellowPitarr = [];
    }

    public openPitMixedUpModalstatus() {
      //this.collectAllYellowPits();
      this.closePitMixedUpModalstatus();
    }

    public collectAllYellowPits(){
      console.log('PIT Clikced   {}  {}  ' + this.clickedPit.pitId ,  this.clickedPitId);
      this.allPitbyMcc.responseBody.forEach( (pit)=> {
        if(pit.pitStatus.pitConfigCode == 'PIT_STATUS_MIXUP_6_8D_COMPLETE'){
          this.yellowPitModel = {
            "pitId":0,
            "pitName":""
          };
          if(this.clickedPit.pitId != pit.pitId){
            this.yellowPitModel.pitId = pit.pitId;
            this.yellowPitModel.pitName = pit.pitName;
            this.yellowPitarr.push(this.yellowPitModel);
            this.activityMixedUpModal = true;
          }
        } 
      })
    }
    
    getSelected(ev: any) {
      //alert(ev.target.value);
      console.log(ev.target.value);
      this.allPitbyMcc.responseBody.forEach( (pit)=> {
        if(pit.pitId == ev.target.value){
          this.getSelectedPit(pit,true);
        } 
      })
      return ev.target.value;
    }


    public getSelectedPit(pit:any,mixedUp :Boolean){
     // alert(mixedUp);
      console.log(mixedUp+" Selected pit to mix {} ::   {} ::  {} ", pit.pitId,this.clickedPitId , pit.pitStatus.pitConfigId);
      this.toPitToMixedUp = pit.pitId;
      
      if(this.activityMixedUpModal){
        this.updatePitStatusPayload.payload.pitTo = this.toPitToMixedUp  ;
        this.updatePitStatusPayload.payload.pitFrom = this.clickedPitId;
        this.updatePitStatusPayload.payload.pitId = this.clickedPitId;
        this.updatePitStatusPayload.payload.pitStatus= pit.pitStatus.pitConfigId;
      }else{
        this.updatePitStatusPayload.payload.pitTo = '';
        this.updatePitStatusPayload.payload.pitFrom = '';
        this.updatePitStatusPayload.payload.pitId = this.clickedPit.pitId;
        this.updatePitStatusPayload.payload.pitStatus= this.clickedPit.pitStatus.releaseAction;
      }
      console.log(" REQ OBJ :: {}  ", this.updatePitStatusPayload.payload);
  }

  public onSubmitPitUpdateStatusRequest(){
    console.log('onSubmitPitUpdateStatusRequest.{} ', this.updatePitStatusPayload);
    this.pitService
      .updateRequestForStatusUpdate(this.updatePitStatusPayload)
      .subscribe((response) => (this.responseforWorkflowstart = response));
      console.log('PIT Status Update{} ', this.responseforWorkflowstart);
      alert('PIT Status Update Successfully');
      this.closePitActivityModalstatus();
      this.closePitMixedUpModalstatus();
      this.closePitmodalstatus();
      this.onRefresh();
  }

  public showPitView(){
    this.showPitTabView = true;
    this.showTodayTaskView = false;
    this.tabName = "Pit View"
      }
    
      public showTodayTask(){
        this.showPitTabView = false;
        this.showTodayTaskView = true;
        this.tabName = "Today Task"
      }
}

export enum pitStatus{
  PIT_STATUS_FILL_UP_1_2D,
  PIT_EMPTY_GARBAGE_COL_NOT_STARTED,
  PIT_EMPTY_AFTER_MIXED_UP,
  PIT_COMPOST_DONE,
  PIT_GARBAGE_COLLECT,
  PIT_UNDER_MAINTENANCE
}

export enum pitInitStatus{
  PIT_EMPTY_GARBAGE_COL_NOT_STARTED,
  PIT_COMPOST_DONE,
  PIT_GARBAGE_COLLECT,
  PIT_UNDER_MAINTENANCE
}