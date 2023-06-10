import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Attributes, Access, Userentity, Userrole, Userdetail, UserRoleMenu, ZoneId, WcEntity, MccEntity, Menu } from 'src/app/model/menu.model';
import { PitService } from 'src/app/service/pit.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../../common.css', './sidebar.component.css']
})
export class SidebarComponent {


  public attributes : Attributes={
    phoneNumber: [],
    role: [],
    isActive: [],
    address2: [],
    address1: []
  }
  
  public access : Access={
    manageGroupMembership: false,
    view: false,
    mapRoles: false,
    impersonate: false,
    manage: false
  }
  
  public zoneId : ZoneId = {
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    zoneId: 0,
    zoneName: '',
    zoneDesc: ''
  }
  
  public wcEntity : WcEntity={
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    wcId: 0,
    wcName: '',
    wcDesc: '',
    active: false
  }
  
  public mccEntity : MccEntity = {
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    mccId: 0,
    mccName: '',
    mccDesc: '',
    wc: this.wcEntity,
    zoneId: this.zoneId,
    active: false
  }
  
  public userentity : Userentity={
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    id: 0,
    userUniqueId: '',
    wcEntity: this.wcEntity,
    mccEntity: this.mccEntity
  }
  
  public userrole : Userrole={
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    id: 0,
    userId: '',
    name: '',
    userEmail: ''
  }
  
  public userdetail : Userdetail={
    id: '',
    createdTimestamp: 0,
    username: '',
    enabled: false,
    totp: false,
    emailVerified: false,
    firstName: '',
    lastName: '',
    email: '',
    attributes: this.attributes,
    disableableCredentialTypes: [],
    requiredActions: [],
    notBefore: 0,
    access: this.access
  }
  
  public userRoleMenu : UserRoleMenu={
    access_token: '',
    refresh_token: '',
    userdetails: [],
    userentity: [],
    userrole: this.userrole,
    menuitem: []
  }
  
  lolginDetails: any;
  menuItem_ : any;

  name:string="";
  role:string="";
  mccName:string="";

  constructor(public router : Router,public pitService : PitService){
   
  }

 

  ngOnInit(): void {
    this.lolginDetails =  JSON.parse(localStorage.getItem('logindetails')??"");
    this.menuItem_ = this.lolginDetails.menuitem;   
    this.name = this.lolginDetails.userdetails[0].firstName + " "+ this.lolginDetails.userdetails[0].lastName;
    this.role = this.lolginDetails.userdetails[0].attributes.role[0];
    this.mccName = this.lolginDetails.userentity[0].mccEntity.mccName + "("+  this.lolginDetails.userentity[0].mccEntity.wc.wcName  +")"
   
  }

  onClickOnMenu(mccItem : any){
    this.pitService.selectMccId.next(mccItem.mccId)
    this.router.navigate(['/superadmin/mcc/pit-view']);
  }


public doLogout() : void{
     localStorage.removeItem('access_token');
     localStorage.removeItem('role');
     localStorage.removeItem('logindetails');
     localStorage.clear();
     this.router.navigate(['/login'])
}

}
