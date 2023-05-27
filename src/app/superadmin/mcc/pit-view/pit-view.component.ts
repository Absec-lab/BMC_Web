import { Component } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { PitInitModalReq, PitModel, PitStageBody, PitStageReq, PitStageRoot } from 'src/app/model/pit.model';
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

 //All modal status by var
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
  public pitMixStatus : Boolean=false;

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
   isEventNeeded :boolean =false;

   displayPopover() {
    const popoverItem = document.querySelector('.popover-item') as HTMLDivElement;
    popoverItem.classList.toggle('show');
  }

  public pitAllStages:PitStageReq =   {
    pitId: 0
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

  // onResetModal(){

  // }

  onRefresh(){
    this.pitService
      .getAllPitsByMcc()
      .subscribe((response) => (this.allPitbyMcc = response));
  }

  getPitStageDetails(){
    console.log('  PIT stages  ', this.pitAllStages);
    this.pitService
      .getAllPitStagesStatus(this.pitAllStages)
      .subscribe((response) => (this.allPitStages = response));
  }


  closePitActivityModalstatus(){
    this.pitmodalstatus =false;
    this.yellowPitarr=[];
    this.clickedPit.pitId=0;
  }

  onAlertClick(){
    this.convertMaptoJson();
    this.modalService.close();
  }

  // aSubmit  for init workflow...............
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
  
  }

  // Submit of  init workflow...............
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

    pitFromId : string = "0";
    pitToPit : string ="0";
    pitidUpdateOnAny : string = "0";
    pitStatusOverwrite : string ="0";

    public showPitmodalstatus(pit : any) {
      this.pitAllStages.pitId = pit.pitId;

      this.getPitStageDetails();
      this.activeNotification = pit.pitStatus.activityMsg;
      this.pitFromId = pit.pitId ;
      this.clickedPitId = pit.pitId;
      this.actionRequired = pit.pitStatus.isEventNeeded;
      this.clickedPit = pit;
      this.pitidUpdateOnAny = pit.pitId;
      this.pitMixStatus = false;
     if(pit.pitStatus.pitConfigCode == "PIT_EMPTY_GARBAGE_COL_NOT_STARTED"){
      this.pitmodalstatus = true;
     }else if(pit.pitStatus.pitConfigCode == "PIT_GARBAGE_COLLECT"){
      this.pitmodalstatus = true;
     }else if(pit.pitStatus.pitConfigCode == "PIT_EMPTY_AFTER_MIXED_UP"){
      this.pitmodalstatus = false;
     }else if(pit.pitStatus.pitConfigCode == "PIT_COMPOST_DONE"){
      this.pitmodalstatus = false;
     }else if(pit.pitStatus.pitConfigCode == "PIT_STATUS_MIXUP_6_8D_COMPLETE"){
      this.pitMixStatus =true;
      console.log(" On alett click innnnnn {} {} ",pit , this.pitMixStatus);
      this.collectAllYellowPits();
     }else if(pit.pitStatus.isNotfEnable == 1 ){
      this.pitmodalstatus = false;
     }else if(pit.pitStatus.pitConfigCode == "PIT_MIXUP_14_16D_COMPLETE"){
          this.pitStatusOverwrite="4"
     }else if(pit.pitStatus.pitConfigCode == "PIT_MIXUP_21_22D_COMPLETE"){
          this.pitStatusOverwrite= "5";
     }else if(pit.pitStatus.pitConfigCode == "PIT_COMPOST_DONE"){
          this.pitStatusOverwrite= "6";
     }

    console.log('  MIX STATUS : :::::::::::      ',this.pitMixStatus);
    if(pit.pitStatus.pitConfigCode == "PIT_STATUS_MIXUP_6_8D_COMPLETE" || pit.pitStatus.pitConfigCode == "PIT_MIXUP_14_16D_COMPLETE" 
                              || pit.pitStatus.pitConfigCode == "PIT_MIXUP_21_22D_COMPLETE" ||  pit.pitStatus.pitConfigCode == "PIT_EMPTY_GARBAGE_COL_NOT_STARTED"  
                              || pit.pitStatus.pitConfigCode == "PIT_STATUS_FILL_UP_1_2D" ){
                                this.isEventNeeded = true;    
    }
 
     this.openPitmodalstatus();
 }
 

    
     
    

   
  
    public closePitmodalstatus() {
      this.pitmodalstatus = false;
      this.yellowPitarr=[];
    }

    
    public openPitmodalstatus() {
      this.pitmodalstatus = true;
    }


    public closePitMixedUpModalstatus() {
      //  this.activityMixedUpModal = false;
      this.yellowPitarr = [];
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
          }
          console.log(' mix stag ',this.yellowPitModel)
        } 
      })
    }
    
    originalVal : number = 0;
    comparedselectedVal : number = 0;
    getSelected(ev: any) {
      alert(ev.target.value);
      this.originalVal = ev.target.value;
      console.log('  mcccc  44444444444444444     ' , ev.target.value);
      console.log('  mcccc  iddddddddddddd     ' , this.allPitbyMcc);
       this.pitToPit = ev.target.value,true;
      this.getSelectedPit(ev.target.value,true);
      return ev.target.value;
    }


    public getSelectedPit(pit:any,mixedUp :Boolean){
       console.log(" Test Yellow pits : " , this.yellowPitarr);
      if(this.originalVal == 0){
         
          console.log('Either User has not selected any vallue from dropdown or there is one element in dropdown to be selected bydefault');
          pit.pitId =   this.yellowPitarr[0].pitId;
          this.pitToPit = this.yellowPitarr[0].pitId;
      }
      console.log(mixedUp+" Selected pit to mix {} ::   {} ::  {}  :: {} ", this.toPitToMixedUp , pit.pitId,this.clickedPit );
      this.toPitToMixedUp = pit.pitId;
      console.log(this.clickedPit.pitStatus.pitConfigCode);
      if(this.clickedPit.pitStatus.pitConfigCode =='PIT_STATUS_MIXUP_6_8D_COMPLETE'){
        console.log('111111111');
        this.updatePitStatusPayload.payload.pitTo =  this.pitToPit ;
        this.updatePitStatusPayload.payload.pitFrom = this.pitFromId;
        this.updatePitStatusPayload.payload.pitId = this.clickedPitId;
        this.updatePitStatusPayload.payload.pitStatus= this.clickedPit.pitStatus.pitConfigId;
      }else{
 
      
        this.updatePitStatusPayload.payload.pitTo = '';
        this.updatePitStatusPayload.payload.pitFrom = '';
        this.updatePitStatusPayload.payload.pitId = this.pitidUpdateOnAny;
        this.updatePitStatusPayload.payload.pitStatus=  this.pitStatusOverwrite;
      }
      console.log(" REQ OBJ :: {}  ", this.updatePitStatusPayload.payload);
  }


  //Submit for PIT Status update.................................
  public onSubmitPitUpdateStatusRequest(){
    console.log('onSubmitPitUpdateStatusRequest.{} ', this.updatePitStatusPayload);
    this.pitService
      .updateRequestForStatusUpdate(this.updatePitStatusPayload)
      .subscribe((response) => (this.responseforWorkflowstart = response));
      console.log('PIT Status Update{} ', this.responseforWorkflowstart);
      alert('PIT Status Update Successfully');
      this.closePitmodalstatus();
      this.onRefresh();

      this.pitToPit="0";
      this.pitFromId="0";
  }


  // hanld esingle button click for different event of action in PIT process...
  public executeUpdateStatusByPitCurrentStatus(){
    
   console.log("action event  :::  current status of pit{} ",  this.clickedPit , this.clickedPit.pitStatus.pitConfigCode);

    
     if(this.clickedPit.pitStatus.pitConfigCode == 'PIT_STATUS_MIXUP_6_8D_COMPLETE'){
      this.activityMixedUpModal = true;
      // this.allPitbyMcc.responseBody.forEach( (pit)=> {
      //   if(pit.pitId == this.clickedPitId){
      //     this.getSelectedPit(pit,true);
      //   } 
      // })
      this.onSubmitPitUpdateStatusRequest();
    }else if(this.clickedPit.pitStatus.pitConfigCode == 'PIT_MIXUP_14_16D_COMPLETE'){
      this.allPitbyMcc.responseBody.forEach( (pit)=> {
        
      })
      this.pitStatusOverwrite = "4";
      this.updatePitStatusPayload.payload.pitId=this.pitidUpdateOnAny;
      this.updatePitStatusPayload.payload.pitStatus = this.pitStatusOverwrite;
      this.onSubmitPitUpdateStatusRequest();
    }else if(this.clickedPit.pitStatus.pitConfigCode == 'PIT_MIXUP_21_22D_COMPLETE'){
      // this.allPitbyMcc.responseBody.forEach( (pit)=> {
      //   if(pit.pitId == this.clickedPitId){
      //     this.getSelectedPit(pit,false);
      //   } 
      // })
      this.pitStatusOverwrite = "5";
      this.updatePitStatusPayload.payload.pitId=this.pitidUpdateOnAny;
      this.updatePitStatusPayload.payload.pitStatus = this.pitStatusOverwrite;
      this.onSubmitPitUpdateStatusRequest();
    }else if(this.clickedPit.pitStatus.pitConfigCode == 'PIT_COMPOST_DONE'){
      // this.allPitbyMcc.responseBody.forEach( (pit)=> {
      //   if(pit.pitId == this.clickedPitId){
      //     this.getSelectedPit(pit,false);
      //   } 
      // })
      this.pitStatusOverwrite = "6";
      this.updatePitStatusPayload.payload.pitId=this.pitidUpdateOnAny;
      this.updatePitStatusPayload.payload.pitStatus = this.pitStatusOverwrite;
        this.onSubmitPitUpdateStatusRequest();
    }else if(this.clickedPit.pitStatus.pitConfigCode == 'PIT_EMPTY_GARBAGE_COL_NOT_STARTED'){
      console.log("action event  ");
        this.onSubmitRequestForInit();
    }

    this.closePitmodalstatus();
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

export enum pitNoActionStatusEnum{
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

export enum pitWorkflowEnum{
  PIT_STATUS_MIXUP_6_8D_COMPLETE,
  PIT_COMPOST_DONE,
  PIT_MIXUP_14_16D_COMPLETE,
  PIT_MIXUP_21_22D_COMPLETE
}