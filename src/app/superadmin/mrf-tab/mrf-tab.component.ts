import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ColDef } from 'ag-grid-community';
import { ToastService } from 'src/app/service/toast.service';
import { MrfActionRendererComponent } from './mrf-action-renderer/mrf-action-renderer.component';
@Component({
  selector: 'app-mrf-tab',
  templateUrl: './mrf-tab.component.html',
  styleUrls: ['../../common.css', './mrf-tab.component.css'],
  providers: [DatePipe]
})
export class MrfTabComponent implements OnInit {

  constructor(private service: CommonService, private formBuilder: FormBuilder, private datePipe: DatePipe, private toastService: ToastService) {
    this.getItemName()
    this.getItemcategory()
    this.wcId = localStorage.getItem('wcId')
    this.getList()
    this.getAllGoods()
    //this.getAllSoldData()
    //this.getList()
  }

   
  isAdd: boolean = true
  isUpdate: boolean = false
  goodList: any = []
  goodResponse: any
  subGoodResponse: any
  subgoodList: any = []
  mrfGridList: any = []
  mrfGridResponse: any
  soldGridList: any = []
  soldGridResponse: any
  list: any = []
  soldList:any=[]
  goodsList: any = []
  goodsName: any
  subGoodsId: any
  mrfTrnsId: any
  mrfResponse: any
  mrfList: any
  isActive: any
  selectionMode = "multiple";
  wcId: any = 0;
  id: any = 0;
  vehicleNo: any
  searchText: any;
  activeTripResponse: any
  activeTripList: any = []
  itemPurchaseList: any = []
  itemPurchaseResponse: any
  vehcileDataResponse: any
  tripStartButton: boolean = false
  tripEndButton: boolean = false
  grossWeightCapturedButton: boolean = false
  dryButton: boolean = false
  wetWeightCapturedButton: boolean = false
  tripResponse: any
  errorResponse: any
  responseData: any
  categoryName: any
  inventoryList: any = []
  itemIssueList: any = []
  itemIssueResponse: any
  itemStockList: any = []
  totalCostP:any;
  itemStockResponse: any
  form = new FormGroup({
    id: new FormControl,
    mrfTrnsId: new FormControl,
    goodsId: new FormControl('', [Validators.required]),
    goodssubId: new FormControl('', [Validators.required]),
    interMaterial: new FormControl('', [Validators.required]),
    mrfDesc: new FormControl(''),
    quntaum: new FormControl('', [Validators.required]),
    goods: new FormControl,
    subGood: new FormControl,
    isActive: new FormControl,
    itemPurchaseId: new FormControl,
    itemCategoryId: new FormControl,
    itemId: new FormControl,
    itemName: new FormControl,
    itemQuantity: new FormControl,
    itemCost: new FormControl,
    category: new FormControl,
    item: new FormControl,
    description: new FormControl,
    unitId: new FormControl,
    uploadBill: new FormControl,
    issueDate: new FormControl,
    itemPurchaseDate: new FormControl,
    noOfPackets: new FormControl,
    bailingWeight: new FormControl,
    soldToId:new FormControl('', [Validators.required])
  });
  editForm = new FormGroup({
    id: new FormControl,
    mrfTrnsId: new FormControl,
    goodsId: new FormControl,
    subGoodId: new FormControl,
    interMaterial: new FormControl,
    mrfDesc: new FormControl,
    quntaum: new FormControl,
    goods: new FormControl,
    subGood: new FormControl,
    itemCategoryId: new FormControl,
    itemId: new FormControl,
    itemName: new FormControl,
    itemQuantity: new FormControl,
    itemCost: new FormControl,
    category: new FormControl,
    item: new FormControl,
    description: new FormControl
  })
  unitList: any = []
  bailingList: any = []
  bailingGridresponse: any
  bailingGridList: any = []
  rowDataBailing: any

 getAllMrfData(){
  this.service.getAllMrf(parseInt(this.wcId)).subscribe(
    data => {
      this.mrfGridResponse = data
      this.mrfGridList = this.mrfGridResponse
      const rowDataMrf = this.mrfGridList.map((item: {  mrfTrnsId:any,  goods: any; wcId: any; subGoodsPerKg:any; interMaterial: any; mrfDesc: any; quntaum: any; subGood: any; createdDate: any; updateDate: any; }) => {

        return {
          mrfTransactionId: item.mrfTrnsId,
          wcName: item.wcId?.wcName,
          goods_name: item.goods.goodsName,
          sub_goods_name: item.subGood.subgoodsName,
          goods: item.goods.goodsPerKg,
          inert_material: item.interMaterial,
          quntaum: item.quntaum,
          price_per_kg:'Rs '+ item.subGood.subGoodsPerKg,
          total_subgoods_price:'Rs '+  item.subGood.subGoodsPerKg * item.quntaum,
          description: item.mrfDesc,
          created_date: item.createdDate

        };
      });
      console.log("MrfGridList", this.mrfGridList)
      console.log("rowData", rowDataMrf)
      this.rowDataMrf = rowDataMrf;
      console.log(this.mrfList)
    }
  );
 }


 getAllSoldData(){
  
 
  this.service.getAllMrfSoldByWCId(parseInt(this.wcId)).subscribe(
    data => {
      
      this.soldGridResponse = data;
      this.soldGridList = this.soldGridResponse;
      console.log(this.soldGridList);
      console.log("hi")
      const rowDataSold = this.soldGridList.map((item: {  id:any,  goodsEntity: any; wcId: any; soldToId: any; mrfDesc: any; quntaum: any; goodssubEntity: any; createdDate: any;itemCost:any; updateDate: any;itemQuantity:any; }) => {

        return {

  
          soldTransactionId: item.id,
          wcName: item.wcId?.wcName,
          goods_name: item.goodsEntity.goodsName,
          sub_goods_name: item.goodssubEntity.subgoodsName, 
          price_per_kg:'Rs '+  item.goodssubEntity.subGoodsPerKg,         
          quntaum: item.itemQuantity,
          sold_to:item.soldToId,
          cost:'Rs '+ item.goodssubEntity.subGoodsPerKg * item.itemQuantity,
          description: item.mrfDesc,
          created_date: item.createdDate

        };
      });
  //    console.log("MrfGridList", this.mrfGridList)
  //    console.log("rowData", rowDataMrf)
      this.rowDataSold = rowDataSold;
  //    console.log(this.mrfList)
    }
  );
 }

  ngOnInit() {
    this.getAllMrfData();
    this.getAllSoldData();
    this.service.getAllBailingList().subscribe(
      data => {
        this.bailingGridresponse = data
        this.bailingGridList = this.bailingGridresponse.data
        console.log(this.bailingGridList, "BailingGriid")
        const rowDataBailing = this.bailingGridList.map((item: { goods: any; wcId: any; subGood: any; createdDate: any; noOfPackets: any; bailingWeight: any; mrfDesc: any; updateDate: any; }) => {

          return {
            wcName: item.wcId?.wcName,
            goods_name: item.goods.goodsName,
            sub_goods_name: item.subGood.subgoodsName,
            goods: item.goods.goodsPerKg,
            noOfPackets: item.noOfPackets,
            descriptions: item.mrfDesc,
            bailing_weight: item.bailingWeight,
            created_date: item.createdDate
          };
        });

        this.rowDataBailing = rowDataBailing
        console.log(this.rowDataBailing)
      }
    );
    this.getAllGoods()
    this.service.getAllBailingStock().subscribe(
      data => {
       
        this.itemStockResponse = data
        this.itemStockList = this.itemStockResponse
        console.log(this.itemStockList,"bailingList")
        const rowDataStock = this.itemStockList.map((item: {
          quntaum: any; goods:any;wcId:any;subGood:any; 
        }) => {
          

          return {
               
            wc_name:item.wcId.wcName,

            goods_name: item.goods.goodsName,
            sub_goods_name:item.subGood.subgoodsName,
            price_per_kg:'Rs '+ item.subGood.subGoodsPerKg,
            total_subgoods_price:'Rs '+  item.subGood.subGoodsPerKg * item.quntaum,
            quntaum: item.quntaum
         //   stockQuantity: item.stockQuantity,
            

          };
          
        });
     //   alert(rowDataStock);

        
      //  alert(this.itemStockList)

      //  console.log("itemStockList", this.itemStockList)
     //   console.log("rowDataStock", rowDataStock)
        this.rowDataStock = rowDataStock;

      }
    );
    this.service.getAllUnit().subscribe(
      data => {
        this.unitList = data
      }
    );
    this.service.getAllItemCategory().subscribe(
      data => [
        this.itemCategoryList = data
      ]
    );
    this.service.getAllItemName().subscribe(
      data => {
        this.itemNameList = data
      }
    );
  }
  itemCategoryList: any = []
  itemNameList: any = []

  getAllGoods() {
    this.service.getAllGoods(parseInt(this.wcId)).subscribe(
      data => {
        console.log('  goods res ::  ', data)
        this.goodResponse = data
        this.goodList = this.goodResponse
        //console.log(this.goodList)
      }
    );
  }
  getAllSubGoods() {
    this.service.getAllSubGood(parseInt(this.wcId)).subscribe(
      data => {
        this.subGoodResponse = data
        //console.log(this.subGoodResponse)
        this.subgoodList = this.subGoodResponse
      }
    );
  }
  getAllSubGoodByGoodId() {
    console.log(this.form.value.goodsId)
    this.service.getAllSubGoodByGoodId(this.form.value.goodsId).subscribe(
      data => {
        this.responseData = data
        this.subgoodList = this.responseData   //this.responseData.data.sort((a: any, b: any) => a.subgoodsName - b.subgoodsName)
        //this.form.value.goodsId=this.responseData.goods.goodId
        //this.goodsName=this.responseData.goods.goodsName
        console.log(this.subgoodList)
      }
    );
  }
  async getList() {
    try {
      let wcId = localStorage.getItem('role') != 'bmcadmin' ? this.wcId : 0
      this.list = await this.service.get(`/zone/getAllMrfSoldByWCId/` + wcId)
      // this.goodsList = await this.service.get(`/zone/getAllGoods`)
      //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
      console.error(e)
    }
  }

  async getSoldList() {
    try {
      let wcId = localStorage.getItem('role') != 'bmcadmin' ? this.wcId : 0
      this.soldList = await this.service.get(`/zone/getAllMrfSoldByWCId/` + wcId)
      // this.goodsList = await this.service.get(`/zone/getAllGoods`)
      //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
      console.error(e)
    }
  }

  async getStockData() {
    try {
      let wcId = localStorage.getItem('role') != 'bmcadmin' ? this.wcId : 0
      this.list = await this.service.get(`/zone/getAllStockData/` + wcId)
      // this.goodsList = await this.service.get(`/zone/getAllGoods`)
      //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
      console.error(e)
    }
  }

  async getItemPurchaseList() {
    try {
      this.inventoryList = await this.service.get(`/inventory/getAllItemPurchase`)
      this.inventoryList = this.inventoryList.sort((a: any, b: any) => a.itemCategoryName - b.itemCategoryName)
    } catch (e) {
      console.error(e)
    }
  }
  async getItemIssueList() {
    try {
      this.itemIssueList = await this.service.get(`/inventory/getAllItemIssuse`)
      this.itemIssueList = this.itemIssueList.sort((a: any, b: any) => a.itemname - b.itemname)
    } catch (e) {
      console.error(e)
    }
  }
  saveMrf() {

    if (this.form.status === 'INVALID') {
      if (!this.wcId) {
        this.toastService.showWarning('Wealth center is required. Please login again. ');
        return;
      }
      const goodsName = this.form.value.goodsId?.trim();
      if (!goodsName || goodsName === '') {
        this.toastService.showWarning('Goods name is required.');
        return;
      }
      const subGoodsName = this.form.value.goodssubId?.trim();
      if (!subGoodsName || subGoodsName === '') {
        this.toastService.showWarning('Sub-Goods name is required.');
        return;
      }
      const goodsWeight: any = this.form.value.quntaum;
      if ((goodsWeight != 0 && !goodsWeight) || goodsWeight === '') {
        this.toastService.showWarning('Goods weight is required.');
        return;
      }
      if (+goodsWeight < 0) {
        this.toastService.showWarning('Goods weight must be a valid number.');
        return;
      }
      const inertMaterial: any = this.form.value.interMaterial;
      if ((inertMaterial != 0 && !inertMaterial) || inertMaterial === '') {
        this.toastService.showWarning('Inert material is required.');
        return;
      }
      if (+inertMaterial < 0) {
        this.toastService.showWarning('Inert material must be a valid number.');
        return;
      }
      
   

    const goods = this.goodList[this.goodList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
    const subgoods = this.subgoodList[this.subgoodList.findIndex((e: any) => e.goodssubId == this.form.value.goodssubId)]
    const data = {
      "goods": goods,
      "interMaterial": this.form.value.interMaterial,
      "mrfDesc": this.form.value.mrfDesc,
      "quntaum": this.form.value.quntaum,
      "subGood": subgoods,
      "wcId": {
        "wcId": 118
      }
    }
    console.log(data)
    this.service.saveMrfData(data).subscribe(
      data => {
        window.alert("Mrf data saved successfully")
        this.mrfGridResponse = data
        this.mrfGridList = this.mrfGridResponse.data
        const rowDataMrf = this.mrfGridList.map((item: { goods: any; wcId: any; interMaterial: any; mrfDesc: any; quntaum: any; subGood: any; createdDate: any; updateDate: any; }) => {

          return {
            goods_name: item.goods.goodsId,
            sub_goods_name: item.subGood.goodssubId,
            goods: item.goods,
            inert_material: item.interMaterial,
            description: item.mrfDesc,
            quntaum: item.quntaum,
            wcName: item.wcId?.wcName

          };
        });
        console.log("MrfList", this.mrfGridList)
        console.log("rowData", rowDataMrf)
        this.rowDataMrf = rowDataMrf;
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
    this.getList()
    this.form.reset()
  }
}
  updateMrf() {


    this.editForm.value.mrfTrnsId = (document.querySelector(`input[id="mrf_transactionId"]`) as HTMLInputElement).value 
    this.editForm.value.mrfDesc = (document.querySelector(`input[id="mrf_desc"]`) as HTMLInputElement).value 
    this.editForm.value.goods = {"goodsId":this.form.value.goodsId}
    this.editForm.value.subGood = {"goodssubId":this.form.value.goodssubId}
    this.editForm.value.interMaterial = (document.querySelector(`input[id="mrf_inert"]`) as HTMLInputElement).value
    this.editForm.value.quntaum = (document.querySelector(`input[id="mrf_quantum"]`) as HTMLInputElement).value

    console.log("Form Value" + this.editForm.value)
    this.service.updateMrfLatest(this.editForm.value).subscribe(
      data => {
        this.getAllMrfData();
        this.form.reset();
        const addBtn = document.querySelector('.add-mrf-btn') as HTMLElement;
        addBtn.classList.toggle('d-none');
    
        const updateBtn = document.querySelector('.update-mrf-btn') as HTMLElement;
        updateBtn.classList.toggle('d-none');
        
        // this.mrfGridResponse = data
        // this.mrfGridList = this.mrfGridResponse.data
        // const rowDataMrf = this.mrfGridList.map((item: { goods: any; interMaterial: any; mrfDesc: any; quntaum: any; subGood: any; createdDate: any; updateDate: any; }) => {

        //   return {
        //     goods_name: item.goods.goodsId,
        //     sub_goods_name: item.subGood.goodssubId,
        //     goods: item.goods,
        //     inert_material: item.interMaterial,
        //     description: item.mrfDesc,
        //     quntaum: item.quntaum

        //   };
        // });
        // console.log("MrfGridList", this.mrfGridList)
        // console.log("rowData", rowDataMrf)
        // this.rowDataMrf = rowDataMrf;

  
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






//save stock
saveStock() {

  if (this.form.status === 'INVALID') {
    if (!this.wcId) {
      this.toastService.showWarning('Wealth center is required. Please login again. ');
      return;
    }
    const goodsName = this.form.value.goodsId?.trim();
    if (!goodsName || goodsName === '') {
      this.toastService.showWarning('Goods name is required.');
      return;
    }
    const subGoodsName = this.form.value.goodssubId?.trim();
    if (!subGoodsName || subGoodsName === '') {
      this.toastService.showWarning('Sub-Goods name is required.');
      return;
    }
    const goodsWeight: any = this.form.value.quntaum;
    if ((goodsWeight != 0 && !goodsWeight) || goodsWeight === '') {
      this.toastService.showWarning('Goods Quantity is required.');
      return;
    }
    if (+goodsWeight < 0) {
      this.toastService.showWarning('Goods Quantity must be a valid number.');
      return;
    }

    //cost per kg

    
    console.log(this.totalCostP);
    const costPerkg :any =this.form.value.itemCost;
    if ((costPerkg != 0 && !costPerkg) || costPerkg === '') {
      this.toastService.showWarning('Cost/Kg is required.');
      return;
    }
    if (+costPerkg < 0) {
      this.toastService.showWarning('Cost/Kg must be a valid number.');
      return;
    }



    const inertMaterial: any = this.form.value.interMaterial;
    if ((inertMaterial != 0 && !inertMaterial) || inertMaterial === '') {
      this.toastService.showWarning('Inert material is required.');
      return;
    }
    if (+inertMaterial < 0) {
      this.toastService.showWarning('Inert material must be a valid number.');
      return;
    }
    return;
  }

  const goods = this.goodList[this.goodList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
  const subgoods = this.subgoodList[this.subgoodList.findIndex((e: any) => e.goodssubId == this.form.value.goodssubId)]
  const data = {
    "goods": goods,
    "subGood": subgoods,
    "quntaum":this.form.value.quntaum,
    "cost":this.form.value.itemCost,
    "interMaterial": this.form.value.interMaterial,
    "mrfDesc": this.form.value.mrfDesc,
   // "quntaum": this.form.value.quntaum,
    
    "wcId": {
      "wcId": localStorage.getItem("wcId")
    }
  }
  console.log(data);
  this.service.saveStockData(data).subscribe(
    data => {
      window.alert("Stock Data Saved Successfully");
      this.mrfGridResponse=[];
      this.mrfGridResponse = data
      this.mrfGridList = this.mrfGridResponse.data
      const rowDataMrf = this.mrfGridList.map((item: { goods: any; wcId: any; interMaterial: any; mrfDesc: any; quntaum: any; subGood: any; createdDate: any; updateDate: any; }) => {

        return {
          goods_name: item.goods.goodsId,
          sub_goods_name: item.subGood.goodssubId,
          goods: item.goods,
          inert_material: item.interMaterial,
          description: item.mrfDesc,
          quntaum: item.quntaum,
          wcName: item.wcId?.wcName

        };
      });
   //   console.log("MrfList", this.mrfGridList)
  //    console.log("rowData", rowDataMrf)
      this.rowDataMrf = rowDataMrf;
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
  this.getStockData();
  this.form.reset();
}

//end for save stock


  refresh(): void {
    window.location.reload();
  }
  async addItemPurchase() {
    try {
      const category = this.itemCategoryList[this.itemCategoryList.findIndex((e: any) => e.itemCategoryId == this.form.value.itemCategoryId)]  //this.form.value.itemCategoryId
      const item = this.itemNameList[this.itemNameList.findIndex((e: any) => e.itemId == this.form.value.itemId)]
      const unit = this.unitList[this.unitList.findIndex((e: any) => e.unitId == this.form.value.unitId)]
      console.log(this.form.value.itemId)
      console.log(this.form.value.unitId)
      const data = {
        //"itemCategoryId":this.form.value.itemCategoryId,
        //"itemId":this.form.value.itemId,
        // "itemname": this.form.value.itemName,
        "itemQuantity": this.form.value.itemQuantity,
        "description": this.form.value.description,
        "itemCategory": category,
        "itemName": item,
        "unit": unit,
        "itemCost": this.form.value.itemCost,
        "purchaseDate": this.datePipe.transform(this.form.value.itemPurchaseDate, 'yyyy-MM-dd HH:MM'),          //this.form.value.itemPurchaseDate,
        "uploadBill": this.form.value.uploadBill,
        "wcEntity": {
          "wcId": localStorage.getItem("wcId")
        }
      }


      console.log(data)
      // await this.service.post(`/inventory/addItemPurchase`, data)
      this.service.addItemPurchase(data).subscribe(
        data => {
          window.alert("Item purchase data saved successfully!!")
          this.service.getAllItemPurchase().subscribe(
            data => {
              this.itemPurchaseResponse = data
              this.itemPurchaseList = this.itemPurchaseResponse
              const rowDataPurchase = this.itemPurchaseList.map((item: { itemCategory: any; itemName: any; unit: any; itemQuantity: any; purchaseDate: any; itemCost: any; uploadBill: any; description: any; createdDate: any; updateDate: any; }) => {

                return {
                  itemCategoryName: item.itemCategory.categoryName,
                  itemName: item.itemName.itemname,
                  unit: 0,
                  itemQuantity: item.itemQuantity + " " + item.unit.unit,
                  itemCost: item.itemCost,
                  uploadBill: item.uploadBill,
                  purchaseDate: this.datePipe.transform(item.purchaseDate, 'yyyy-MM-dd HH:MM:ss'),//formatDate(item.createdDate, 'yyyy/MM/dd HH:MM:ss', 'en'),
                  description: item.description
                };
              });
              console.log("itemPurchaseList", this.itemPurchaseList)
              console.log("rowDataPurchase", rowDataPurchase)
              this.rowDataPurchase = rowDataPurchase;

            }
          );
          this.service.getAllBailingStock().subscribe(
            data => {
             
              this.itemStockResponse = data
              this.itemStockList = this.itemStockResponse
              console.log(this.itemStockList,"bailingList")
              const rowDataStock = this.itemStockList.map((item: {
                quntaum: any; goods:any;wcId:any;subGood:any; 
              }) => {
                
      
                return {
                     
                  wc_name:item.wcId.wcName,
  
                  goods_name: item.goods.goodsName,
                  sub_goods_name:item.subGood.subgoodsName,
                  price_per_kg:'Rs '+ item.subGood.subGoodsPerKg,
                  total_subgoods_price:'Rs '+  item.subGood.subGoodsPerKg * item.quntaum,
                  quntaum: item.quntaum
               //   stockQuantity: item.stockQuantity,
                  
      
                };
                
              });
           //   alert(rowDataStock);
  
              
            //  alert(this.itemStockList)
  
            //  console.log("itemStockList", this.itemStockList)
           //   console.log("rowDataStock", rowDataStock)
              this.rowDataStock = rowDataStock;
      
            }
          );
        }
      );
      this.form.reset()
      this.getItemPurchaseList()
    } catch (e) {
      console.error(e)
    }

  }

  async addItemIssue() {
    try {
      //const category = this.itemCategoryList[this.itemCategoryList.findIndex((e: any) => e.itemCategoryId == 3)]  //this.form.value.itemCategoryId
      const item = this.itemNameList[this.itemNameList.findIndex((e: any) => e.itemId == this.form.value.itemId)]
      const unit = this.unitList[this.unitList.findIndex((e: any) => e.unitId == this.form.value.unitId)]
      const data = {
        //"itemCategoryId":this.form.value.itemCategoryId,
        //"itemId":this.form.value.itemId,
        // "itemname": this.form.value.itemName,
        "issueQuantity": this.form.value.itemQuantity,
        //"description": this.form.value.description,
        //"itemCategory": category,
        "itemName": item,
        "unit": unit,
        // "itemCost": this.form.value.itemCost,
        "issueDate": this.datePipe.transform(this.form.value.issueDate, 'yyyy-MM-dd HH:MM'), //this.form.value.issueDate,
        //"uploadBill": this.form.value.uploadBill
        "wcEntity": {
          "wcId": localStorage.getItem("wcId")
        }

      }
      console.log(data)
      //  await this.service.post(`/inventory/addItemIssuse`, data)
      this.service.addItemIssue(data).subscribe(
        data => {
          window.alert("Item issued successfully!!")
          this.service.getAllItemIssue().subscribe(
            data => {
              this.itemIssueResponse = data
              this.itemIssueList = this.itemIssueResponse
              const rowDataIssue = this.itemIssueList.map((item: { itemName: any; unit: any; issueQuantity: any; issueDate: any; createdDate: any; updateDate: any; }) => {

                return {
                  itemName: item.itemName.itemname,
                  //unit: 0,
                  itemQuantity: item.issueQuantity + " " + item.unit.unit,
                  createdDate: item.createdDate

                };
              });
              console.log("itemIssueList", this.itemIssueList)
              console.log("rowData", rowDataIssue)
              this.rowDataIssue = rowDataIssue;

            }
          );
          // this.service.getAllItemStockList().subscribe(
          //   data => {
          //     this.itemStockResponse = data
          //     this.itemStockList = this.itemStockResponse
          //     const rowDataStock = this.itemStockList.map((item: {
          //       stockQuantity: any; itemName: any;
          //     }) => {

          //       return {
          //         itemName: item.itemName.itemname,
          //         //unit: 0,
          //         stockQuantity: item.stockQuantity

          //       };
          //     });
          //     console.log("itemStockList", this.itemStockList)
          //     console.log("rowDataStock", rowDataStock)
          //     this.rowDataStock = rowDataStock;

          //   }
          // );
        },
        error => {
          this.errorResponse = error
          this.toastService.showError(this.errorResponse.error.message)
        }
      );

      this.form.reset()
      this.getItemIssueList()
    } catch (e) {
      console.error(e)
    }

  }
  cancel() {
    this.isAdd = true
    this.isUpdate = false
    this.form.reset()
  }

  updateWcc() {
    console.log(this.form.value)
    // this.service.updateSubGood(this.form.value,this.subGoodsId).subscribe(
    //         data => {
    //                 window.alert("SubGood data updated successfully!!")
    //                 this.isAdd = true
    //                 this.isUpdate = false
    //                 this.getList()
    //                 this.form.reset()
    //         },
    //         error => { 
    //                 window.alert("something went wrong")
    //         }
    // );

  }

  getItemNameyByCategoryId() {
    console.log(this.form.value.itemId)
    this.service.getWcById(this.form.value.itemId).subscribe(
      data => {
        this.responseData = data
        this.form.value.itemCategoryId = this.responseData.itemCategory.itemCategoryId
        this.categoryName = this.responseData.itemCategory.categoryName
        console.log(this.categoryName)
      }
    );
  }

  getAllItemNameyByCategoryId() {
    console.log(this.form.value.itemCategoryId)
    this.service.getAllItemNameyByCategoryId(this.form.value.itemCategoryId).subscribe(
      data => {
        this.responseData = data
        this.itemNameList = this.responseData
      }
    );
  }


  async getItemcategory() {
    try {
      this.itemCategoryList = await this.service.getAllItemCategory()
      this.itemCategoryList = this.itemCategoryList.sort((a: any, b: any) => a.routeName - b.routeName)
    } catch (e) {
      console.error(e)
    }
  }
  async getItemName() {
    try {
      this.itemNameList = await this.service.get(`/inventory/getAllItemName`)
      this.itemNameList = this.itemNameList.sort((a: any, b: any) => a.itemName - b.itemName)
    } catch (e) {
      console.error(e)
    }
  }

  updateData(item: any) {
    this.isUpdate = true
    this.isAdd = false
    console.log(item)
    this.vehicleNo = item.vehicle.vehicleNo


  }
  columnDefsPurchase: ColDef[] = [
    { field: 'wcName', headerName: 'Wc Name', unSortIcon: true, resizable: true },
    { field: 'itemCategoryName', headerName: 'Item category', unSortIcon: true, resizable: true, },
    { field: 'itemName', headerName: 'Item Name', unSortIcon: true, resizable: true, },
    { field: 'itemQuantity', headerName: 'Item Quantity', unSortIcon: true, resizable: true, },
    { field: 'itemCost', headerName: 'Item Cost', unSortIcon: true, resizable: true, },
    { field: 'uploadBill', headerName: 'Bill', unSortIcon: true, resizable: true, },
    { field: 'description', headerName: 'Description', unSortIcon: true, resizable: true, },
    { field: 'purchaseDate', headerName: 'Purchase Date', unSortIcon: true, resizable: true, },
    {
      headerName: 'Edit', width: 125, sortable: false, filter: false,
      cellRenderer: (data: any) => {
        return `
      <button class="btn btn-primary btn-sm" (click)="updateData(x)">
        <i class="fa-solid fa-edit"></i>
      </button>
      <button class="btn btn-danger btn-sm">
      <i class="fa-solid fa-trash-alt"></i>
    </button>
     `;
      }
    }
  ];


  columnDefsIssue: ColDef[] = [
    // { field: 'vehicle_starttime', headerName: 'SL. No', unSortIcon: true},
    { field: 'wcName', headerName: 'Wc Name', unSortIcon: true, resizable: true },
    { field: 'itemName', headerName: 'Item Name', unSortIcon: true },
    { field: 'itemQuantity', headerName: 'Item Quantity', unSortIcon: true },
    { field: 'createdDate', headerName: 'Created Date', unSortIcon: true },
    {
      headerName: 'Edit', width: 125, sortable: false, filter: false,
      cellRenderer: (data: any) => {
        return `
    <button class="btn btn-primary btn-sm" (click)="updateData(x)">
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
    editable: true
  };

  gridOptions = {
    defaultColDef: {
      ...this.defaultColDef
    },
    pagination: false,
    rowStyle: { background: '#e2e8f0' },
    copyHeadersToClipboard: true,
    enableRangeSelection: true,
    frameworkComponents: {
      actionCellRenderer: MrfActionRendererComponent
    }
  }
  rowData = [
    { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5', tripEndReading: '120.6', vehicle_starttime: '2023-05-19 06:00:00' }
  ];



  columnDefsStock: ColDef[] = [
    { field: 'wc_name', headerName: 'Wc Name', unSortIcon: true, resizable: true },
    { field: 'sub_goods_name', headerName: 'Stock List', unSortIcon: true, resizable: true, },
    { field: 'quntaum', headerName: 'Quantity', unSortIcon: true, resizable: true, },
    { field: 'price_per_kg', headerName: 'Sub Goods Price(Per Kg)', unSortIcon: true, resizable: true, width: 250 },
    { field: 'total_subgoods_price', headerName: 'Total Price', unSortIcon: true, resizable: true },
  ];


  defaultColDefComp: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  gridOptionsComp = {
    defaultColDef: {
      ...this.defaultColDefComp
    },
    pagination: false,
    rowStyle: { background: '#e2e8f0' }
  }
  rowDataPurchase = [
    { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5', vehicle_starttime: '2023-05-19 06:00:00' }
  ];
  rowDataIssue = [];
  rowDataStock = [];

  /**
 * Code for Grid view
 */

  columnDefsMrf: ColDef[] = [
    { field: 'goods_name', headerName: 'Goods Name', unSortIcon: true, resizable: true },
    { field: 'sub_goods_name', headerName: 'Sub-Goods Name', unSortIcon: true, resizable: true },
    { field: 'quntaum', headerName: 'Sub Goods Weight(Kg)', unSortIcon: true, resizable: true },
    { field: 'price_per_kg', headerName: 'Sub Goods Price(Per Kg)', unSortIcon: true, resizable: true },
    { field: 'total_subgoods_price', headerName: 'Total Price', unSortIcon: true, resizable: true },
    { field: 'inert_material', headerName: 'Inert Material', unSortIcon: true, resizable: true },
    { field: 'description', headerName: 'Description', unSortIcon: true, resizable: true },
    { field: 'created_date', headerName: 'Created Date', unSortIcon: true, resizable: true },
    {
      headerName: 'Edit', width: 125, sortable: false, filter: false, editable: false,
      cellRenderer: 'actionCellRenderer'
    }
  ];

  columnDefsBailing: ColDef[] = [
    { field: 'wc_name', headerName: 'WC Name', unSortIcon: true, resizable: true },
    
    { field: 'goods_name', headerName: 'Goods Name', unSortIcon: true, resizable: true },
    { field: 'sub_goods_name', headerName: 'Sub-Goods Name', unSortIcon: true, resizable: true },
    { field: 'quntaum', headerName: 'Quantity', unSortIcon: true, resizable: true },
      
  ];
  columnDefsSold: ColDef[] = [
    { field: 'goods_name', headerName: 'Goods Name', unSortIcon: true, resizable: true },
    { field: 'sub_goods_name', headerName: 'Sub-Goods Name', unSortIcon: true, resizable: true },
    { field: 'quntaum', headerName: 'Sold Qty', unSortIcon: true, resizable: true },
    { field: 'price_per_kg', headerName: 'Qty Per Price', unSortIcon: true, resizable: true },
    { field: 'cost', headerName: 'Total Cost', unSortIcon: true, resizable: true },
    { field: 'sold_to', headerName: 'Sold To', unSortIcon: true, resizable: true },    
    { field: 'description', headerName: 'Description', unSortIcon: true, resizable: true },
    { field: 'created_date', headerName: 'Created Date', unSortIcon: true, resizable: true },
    
    // {
    //   headerName: 'Edit', width: 125, sortable: false, filter: false,
    //   cellRenderer: (data: any) => {
    //     return `
    //   <button class="btn btn-primary btn-sm" (click)="this.updateData($event)">
    //     <i class="fa-solid fa-edit"></i>
    //   </button>
    //   <button class="btn btn-danger btn-sm">
    //     <i class="fa-solid fa-trash-alt"></i>
    //   </button>
    //  `;
    //   }
    // }
  ];
  rowDataMrf = [];
    rowDataSold=[];

  saveBailing() {
   
    // const goods = this.goodList[this.goodList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
    // const subgoods = this.subgoodList[this.subgoodList.findIndex((e: any) => e.goodssubId == this.form.value.goodssubId)]
    // const data = {
    //   "goods": goods,
    //   "bailingWeight": this.form.value.bailingWeight,
    //   "mrfDesc": this.form.value.mrfDesc,
    //   "noOfPackets": this.form.value.noOfPackets,
    //   "subGood": subgoods,
    //   "wcId": {
    //     "wcId": localStorage.getItem("wcId")
    //   }
    // }
  //  console.log(data)
 //   this.service.addBailing(data).subscribe(
  //    data => {
  //      window.alert("Bailing added successfully")
        // this.service.getAllBailingList().subscribe(
        //   data => {
        //     this.bailingGridresponse = data
        //     this.bailingGridList = this.bailingGridresponse.data
        //     const rowDataBailing = this.bailingGridList.map((item: { goods: any; wcId: any; subGood: any; createdDate: any; noOfPackets: any; bailingWeight: any; mrfDesc: any;  }) => {

        //       return {
        //         wcName: item.wcId?.wcName,
        //         goods_name: item.goods.goodsName,
        //         sub_goods_name: item.subGood.subgoodsName,
        //         goods: item.goods.goodsPerKg,
        //         noOfPackets: item.noOfPackets,
        //         descriptions: item.mrfDesc,
        //         bailing_weight: item.bailingWeight,
        //         created_date: item.createdDate
        //       };
        //     });

        //     this.rowDataBailing = rowDataBailing
        //   } );
        this.service.getAllBailingStock().subscribe(
          data => {
           
            this.itemStockResponse = data
            this.itemStockList = this.itemStockResponse
            console.log(this.itemStockList,"bailingList")
            const rowDataStock = this.itemStockList.map((item: {
              quntaum: any; goods:any;wcId:any;subGood:any; stockQuantity:any;
            }) => {
              
    
              return {
                   
                wc_name:item.wcId.wcName,

                goods_name: item.goods.goodsName,
                sub_goods_name:'Rs '+ item.subGood.subgoodsName,
                price_per_kg:item.subGood.subGoodsPerKg,
                total_subgoods_price:'Rs '+  item.subGood.subGoodsPerKg * item.quntaum,
                quntaum: item.quntaum
             //   stockQuantity: item.stockQuantity,
                
    
              };
              
            });
         //   alert(rowDataStock);

            
          //  alert(this.itemStockList)

          //  console.log("itemStockList", this.itemStockList)
         //   console.log("rowDataStock", rowDataStock)
            this.rowDataStock = rowDataStock;
    
          }
        );
      
       

 
  }
  soldBailing(){

//validation
if (this.form.status === 'INVALID') {
  if (!this.wcId) {
    this.toastService.showWarning('Wealth center is required. Please login again. ');
    return;
  }
  const goodsName = this.form.value.goodsId?.trim();
  if (!goodsName || goodsName === '') {
    this.toastService.showWarning('Goods name is required.');
    return;
  }
  const subGoodsName = this.form.value.goodssubId?.trim();
  if (!subGoodsName || subGoodsName === '') {
    this.toastService.showWarning('Sub-Goods name is required.');
    return;
  }
  const goodsWeight: any = this.form.value.quntaum;
  if ((goodsWeight != 0 && !goodsWeight) || goodsWeight === '') {
    this.toastService.showWarning('Sold Qty is required.');
    return;
  }
  if (+goodsWeight < 0) {
    this.toastService.showWarning('Sold Qty must be a valid number.');
    return;
  }

//sold to
const soldToId = this.form.value.soldToId?.trim();
 
if (!soldToId || soldToId === '') {
  this.toastService.showWarning('Sold To is required.');
  return;
}


//   //  console.log(this.totalCostP);
//   const inertMaterial: any = this.totalCostP;
//   if ((inertMaterial != 0 && !inertMaterial) || inertMaterial === '') {
//     this.toastService.showWarning('Total is required.');
//     return;
//   }
//   if (+inertMaterial < 0) {
//     this.toastService.showWarning('Total Cost must be a valid number.');
//     return;
//   }
//  // return;
}
 

    const goods = this.goodList[this.goodList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
    const subgoods = this.subgoodList[this.subgoodList.findIndex((e: any) => e.goodssubId == this.form.value.goodssubId)]
    const itemCost:any = this.form.value.quntaum
    const data = {
      "id": this.form.value.id,
      "goodsEntity": goods,
      "goodssubEntity": subgoods,
      "itemQuantity":this.form.value.quntaum,
      "soldToId":this.form.value.soldToId,
      "itemCost": itemCost* subgoods.subGoodsPerKg ,
      "mrfDesc": this.form.value.mrfDesc,
     // "noOfPackets": this.form.value.noOfPackets,     
     "wcEntity": {
      "wcId": localStorage.getItem("wcId")
      }
    }
    console.log(data);
    this.service.mrfSoldBailing(data).subscribe(
      data => {
        this.form.reset(); 
    window.alert("Bailing Sold successfully");
        this.soldGridResponse = data;
        this.soldGridList = this.soldGridResponse;
        const rowDataSold = this.soldGridList.map((item: { goodsEntity: any;goodsSubEntity:any; wcId: any;
          itemCost :any; quntaum:any; mrfDesc :any;soldToId:any;createdDate: any;
       goods_name:any;goods_id:any;
      //    interMaterial: any; mrfDesc: any; quntaum: any; subGood: any; createdDate: any; updateDate: any;
         }) => {

          return {

            //goods nm //sub gd nm //sold qty //sold to // total cost // desc //cr dt

 
         //   goods_name="item.goodsEntity.goodsName",
            // goods_id: "item.goodsEntity.goodsId",
            // sub_goods_name: "item.subGood.goodssubId",
            // goods:" item.goods",
            // inert_material: "item.interMaterial",
            // description: "item.mrfDesc",
            // quntaum: "item.quntaum",
            // wcName: "item.wcId?.wcName"

         //   soldTransactionId: item.id,
          //  wcName: item.wcId?.wcName,
            goods_name: item.goodsEntity.goodsName,
            sub_goods_name: item.goodsSubEntity.subgoodsName,
            price_per_kg:'Rs '+ item.goodsSubEntity.subGoodsPerKg,
            quntaum: item.quntaum,
            sold_to:item.soldToId,
            cost:'Rs '+ item.goodsSubEntity.subGoodsPerKg * item.quntaum,
            description: item.mrfDesc,
            created_date: item.createdDate


          };
        });
     //   console.log("MrfList", this.mrfGridList)
         console.log("rowDataSold", rowDataSold)
        this.rowDataSold = rowDataSold;
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
    this.getSoldList();
    this.form.reset();



    //     window.alert("Bailing Sold successfully");
    //     this.service.getAllBailingList().subscribe(
    //       data => {
    //         this.bailingGridresponse = data
    //         this.bailingGridList = this.bailingGridresponse.data
    //         const rowDataBailing = this.bailingGridList.map((item: { goods: any; wcId: any; subGood: any; createdDate: any; noOfPackets: any; bailingWeight: any; mrfDesc: any;  }) => {
    //           return {
    //             wcName: item.wcId?.wcName,
    //             goods_name: item.goods.goodsName,
    //             sub_goods_name: item.subGood.subgoodsName,
    //             goods: item.goods.goodsPerKg,
    //             noOfPackets: item.noOfPackets,
    //             descriptions: item.mrfDesc,
    //             bailing_weight: item.bailingWeight,
    //             created_date: item.createdDate
    //           };
    //         });

    //         this.rowDataBailing = rowDataBailing
    //         this.service.getAllBailingStock().subscribe(
    //           data => {
    //             this.itemStockResponse = data
    //             this.itemStockList = this.itemStockResponse.data
    //             console.log(this.itemStockList,"bailingList")
    //             const rowDataStock = this.itemStockList.map((item: {
    //               stockQuantity: any; goodssubEntity: any; wcEntity:any;
    //             }) => {
        
    //               return {
    //                 itemName: item.goodssubEntity.subgoodsName,
    //                 //unit: 0,
    //                 stockQuantity: item.stockQuantity,
    //                 wcName:item.wcEntity.wcName
        
    //               };
    //             });
    //             console.log("itemStockList", this.itemStockList)
    //             console.log("rowDataStock", rowDataStock)
    //             this.rowDataStock = rowDataStock;
        
    //           }
    //         );
    //       },
    //       error=>{
    //         this.errorResponse=error
    //         this.toastService.showError(this.errorResponse.error.message)
    //       }
    //     );
    //   },
    //   error => {
    //    this.errorResponse=error
    //    this.toastService.showError(this.errorResponse.error.message)
    //   }

    // );
    // this.form.reset()
    
  }


  async estimateCost(){
    var subGdId=5;
    const subGoodsName = this.form.value.goodssubId?.trim();
    const qty: any = this.form.value.quntaum;
    var percost=[];
     percost = await this.service.get(`/zone/getPerCostValueSubGdId/` + subGoodsName);
    
    this.totalCostP=parseFloat(percost[0])*qty;

     

 


 

  }





}
