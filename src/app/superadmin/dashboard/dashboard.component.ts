import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Access, Attributes, MccEntity, Menu, UserRoleMenu, Userdetail, Userentity, Userrole, WcEntity } from 'src/app/model/menu.model';
import { ZoneId } from 'src/app/model/pit.model';
import { PitService } from 'src/app/service/pit.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../common.css', './dashboard.component.css']
})
export class DashboardComponent {

 


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

public menuItem_ : any[]=[]

constructor(private toastr: ToastrService , private route:Router, private pitService: PitService,) {
  this.menuItem_ = route.getCurrentNavigation()?.extras?.state?.['usermenu'];
}


ngOnInit(): void {
 
}




}
