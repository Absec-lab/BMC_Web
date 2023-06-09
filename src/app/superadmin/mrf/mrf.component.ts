import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-mrf',
  templateUrl: './mrf.component.html',
  styleUrls: ['../../common.css', './mrf.component.css']
})
export class MrfComponent implements OnInit{
  isAdd: boolean = true
  isUpdate: boolean = false
  goodList:any=[]
  goodResponse:any
  subGoodResponse:any
  subgoodList:any=[]
  list: any = []
  mrfGridList: any = []
  mrfGridResponse: any
  goodsList: any = []
  goodsName: any
  subGoodsId:any
  mrfTrnsId:any
  mrfResponse:any
  mrfList:any
  responseData:any
  isActive:any
  constructor(private service:CommonService, private formBuilder:FormBuilder){
    this.getList()
    this.getAllGoods()
     this.getAllSubGoods() 
  }
  ngOnInit() {
    this.service.getAllMrf().subscribe(
      data => {
           this.mrfGridResponse = data
           this.mrfGridList = this.mrfGridResponse
           const rowData =   this.mrfGridList.map((item: { goods: any; interMaterial: any; mrfDesc: any; quntaum: any; subGood: any; createdDate: any; updateDate:any; }) => {
            
             return {
               goods_name: item.goods.goodsName,
               sub_goods_name: item.subGood.subgoodsName,
               goods: item.goods.goodsPerKg,
               inert_material: item.interMaterial,
               description: item.mrfDesc,     
               created_date : item.createdDate
             };
           });
          console.log("MrfGridList",this.mrfGridList)
          console.log("rowData",rowData)
          this.rowData=rowData;          
         
                 // window.alert("Mrf data updated successfully!!")
                 // this.isAdd = true
                 // this.isUpdate = false
                 // this.getList()
                 // this.form.reset()
         
 
         console.log(this.mrfList)
       }
     );
    this.getAllGoods()
  }
  form = new FormGroup({
    mrfTrnsId: new FormControl,
    goodsId: new FormControl,
    goodssubId: new FormControl,
    interMaterial: new FormControl,
    mrfDesc: new FormControl,
    quntaum: new FormControl,
    goods: new FormControl,
    subGood: new FormControl,
    isActive: new FormControl
  });
  editForm = new FormGroup({
    goodsId: new FormControl,
    subGoodId: new FormControl,
    interMaterial:new FormControl,
    mrfDescription: new FormControl,
    quntaum:new FormControl,
    goods: new FormControl,
    subGood: new FormControl
})
  getAllGoods(){
     this.service.getAllGoods().subscribe(
      data=>{
       this.goodResponse=data
       this.goodList=this.goodResponse
       //console.log(this.goodList)
      }
     );
  }
  getAllSubGoods(){
    this.service.getAllSubGood().subscribe(
      data=>{
        this.subGoodResponse=data
        //console.log(this.subGoodResponse)
        this.subgoodList=this.subGoodResponse
      }
    );
  }
  getAllSubGoodByGoodId(){
    console.log(this.form.value.goodsId)
    this.service.getAllSubGoodByGoodId(this.form.value.goodsId).subscribe(
            data=>{
                    this.responseData=data
                    this.subgoodList = this.responseData.data.sort((a: any, b: any) => a.subgoodsName - b.subgoodsName)
                    //this.form.value.goodId=this.responseData.goods.goodId
                    //this.goodsName=this.responseData.goods.goodsName
                    console.log(this.subGoodsId)
            }
    );
}
  async getList() {
    try {
            this.list = await this.service.get(`/zone/getAllMrf`)
           // this.goodsList = await this.service.get(`/zone/getAllGoods`)
            //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
            console.error(e)
    }
}
  saveMrf(){
    const goods = this.goodList[this.goodList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
    const subgoods = this.subgoodList[this.subgoodList.findIndex((e: any) => e.goodssubId == this.form.value.goodssubId)]
    const data = {
      "goods": goods,
      "interMaterial": this.form.value.interMaterial,
      "mrfDesc": this.form.value.mrfDesc,
      "quntaum": this.form.value.quntaum,
      "subGood": subgoods
   }
   console.log(data)
   this.service.saveMrfData(data).subscribe(
    data=>{
      window.alert("Mrf data saved successfully")
    }
   );   
   this.getList()
   this.form.reset()
  }
  getGoodId() {
    console.log(this.form.value)
  }
  async remove(id: string) {
    try {
            const res = await this.service.delete(`/zone/deleteMrf/${id}`)
            this.getList()
    } catch (e) {
            console.error(e)
    }
}
updateData(item: any) {
  this.isUpdate = true
  this.isAdd = false
  console.log(item)
  console.log(item.goodssubId)
  this.goodsName = item.goods.goodsName
  this.form.patchValue({
          goodsId: item.goods.goodsId,
          goodssubId: item.subGood.goodssubId,
          mrfTrnsId:item.mrfTrnsId,
          interMaterial: item.interMaterial,
          mrfDesc: item.mrfDesc,
          quntaum: item.quntaum,
          //goods: item.goods,
          //subGood:item.subGood,
          isActive: true
  })
  this.subGoodsId=item.goodssubId
  // this.service.getZoneAllData().subscribe(
  //         async data => {
  //                 this.goodsList = await this.service.get(`/zone/getAllGoods`)
  //         }
  // );

}
cancel() {
  this.isAdd = true
  this.isUpdate = false
  this.form.reset()
}

updateMrf() {
  console.log("Form Value"+this.form.value)
  this.service.updateMrf(this.form.value).subscribe(
          data => {
            this.mrfGridResponse = data
            this.mrfGridList = this.mrfGridResponse.data
            const rowData =   this.mrfGridList.map((item: { goods: any; interMaterial: any; mrfDesc: any; quntaum: any; subGood: any; createdDate: any; updateDate:any; }) => {
             
              return {
                goods_name: item.goods.goodsId,
                sub_goods_name: item.subGood.goodssubId,
                goods: item.goods,
                inert_material: item.interMaterial,
                description: item.mrfDesc,     
                
              };
            });
           console.log("MrfGridList",this.mrfGridList)
           console.log("rowData",rowData)
           this.rowData=rowData;
            
          
                  // window.alert("Mrf data updated successfully!!")
                  // this.isAdd = true
                  // this.isUpdate = false
                  // this.getList()
                  // this.form.reset()
          },
          error => {
                  window.alert("something went wrong")
          }
  );

}

/**
 * Code for Grid view
 */

columnDefs: ColDef[] = [
  { field: 'goods_name', headerName: 'Goods Name', unSortIcon: true},
  { field: 'sub_goods_name', headerName: 'Sub-Goods Name', unSortIcon: true},
  { field: 'goods', headerName: 'Goods (Kg)', unSortIcon: true},
  { field: 'inert_material', headerName: 'Inert Material', unSortIcon: true},
  { field: 'description', headerName: 'Description', unSortIcon: true},
  { field: 'created_date', headerName: 'Created Date', unSortIcon: true},
  { headerName: 'Edit', width: 125, sortable: false, filter: false,
    cellRenderer: (data: any) => {
     return `
      <button class="btn btn-primary btn-sm">
        <i class="fa-solid fa-edit"></i>
      </button>
      <button class="btn btn-danger btn-sm">
        <i class="fa-solid fa-trash-alt"></i>
      </button>
     `; 
    }
  }
];

defaultColDef: ColDef = {
  sortable: true,
  filter: true,
};

gridOptions = {
  defaultColDef: {
    ...this.defaultColDef
  },
  pagination: true,
  paginationPageSize: 10,
  rowStyle: { background: '#e2e8f0' }
}

rowData = [
  ];
}


