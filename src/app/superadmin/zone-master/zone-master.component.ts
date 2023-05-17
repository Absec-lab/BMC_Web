import { withNoXsrfProtection } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, DeactivationDto } from 'src/app/service/common.service';

@Component({
  selector: 'app-zone-master',
  templateUrl: './zone-master.component.html',
  styleUrls: ['../../common.css', './zone-master.component.css']
})
export class ZoneMasterComponent implements OnInit{
        deactivationDto:DeactivationDto=new DeactivationDto
        constructor(private service: CommonService,private route:Router) {
        }
        zoneList: any = []
        ngOnInit() {
              this.service.getZoneAllData().subscribe(
                data=>{
                        this.zoneList=data
                }
              ); 
        }

        form = new FormGroup({
                zoneName: new FormControl(''),
                zoneDesc: new FormControl('')
              });
        
        
        async getZones() {
                try {
                        this.zoneList = await this.service.get(`/zone/getAllZone`)
                        this.zoneList = this.zoneList.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
         addNewZone() {
                 /* Manoj Remove Date 08-05-2023 */
                // try {
                //         console.log(this.form.value)
                //         await this.service.post(`/zone/addZone`, this.form.value)
                //         this.form.reset()
                //         this.getZones()
                // } catch (e) {
                //         console.error(e)
                // }
                /* Manoj added Date 08-05-2023*/
                this.service.addZone(this.form.value).subscribe(
                        data=>{
                                window.alert("Zone data saved sucessfully")
                                this.form.reset()
                                this.service.getZoneAllData().subscribe(
                                        data=>{
                                                this.zoneList=data
                                        }
                                );
                        },
                        error=>{
                                window.alert("Something went wrong")
                        } 
                );
        }
        async removeZone(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteZone/${id}`)
                        this.getZones()
                } catch (e) {
                        console.error(e)
                }
        }

        deactivateZone(id:any){
                this.service.deactivateZone(id).subscribe(
                        data=>{
                                window.alert("Zone deleted successfully")
                                this.service.getZoneAllData().subscribe(
                                        data=>{
                                                this.zoneList=data
                                        }
                                );
                        },
                        error=>{
                                window.alert("Something went wrong!!")
                        }
                );
        }
}
