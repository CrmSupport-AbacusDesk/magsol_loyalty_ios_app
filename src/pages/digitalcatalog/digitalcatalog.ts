import { ConstantProvider } from './../../providers/constant/constant';
import { DbserviceProvider } from './../../providers/dbservice/dbservice';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
* Generated class for the DigitalcatalogPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-digitalcatalog',
  templateUrl: 'digitalcatalog.html',
})
export class DigitalcatalogPage {
  pdf:any=[];
  uploadUrl:string='';
  tokenInfo: any;
  loading:Loading
  db: any;
  
  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController,  public translate:TranslateService, public navParams: NavParams, public con:ConstantProvider, public dbService:DbserviceProvider) {
    this.uploadUrl = con.upload_url;
    this.getpdflist();
    this.presentLoading();
  }
  
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad DigitalcatalogPage');
    
  }

  presentLoading() 
  {
    this.translate.get("Please wait...")
    .subscribe(resp=>{
      this.loading = this.loadingCtrl.create({
        content: resp,
        dismissOnPageChange: false
      });
      this.loading.present();
    })
  }
  
  getpdflist()
  {
    this.dbService.post_rqst({"login_id":this.dbService.karigar_id },"app_karigar/product_catalogue_list")
    .subscribe( r =>
      {
        console.log(r);
        this.loading.dismiss();
        this.pdf = r['pdf']
      }); 
    }
    
  }
  