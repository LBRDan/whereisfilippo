import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';

import { User } from './../../models/user';

import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  public loading : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authPrv: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl : AlertController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  async login (user:User){
    try{      
      const res = await this.authPrv.loginWithEmailAndPassword(user.email,user.password);
      if(res){
        this.navCtrl.setRoot(TabsPage);
      }
      
    }catch(error){
      console.error(error);
      if(error.message){
        let alert = this.alertCtrl.create({
          title: 'Error Logging in',
          subTitle: error.message,
          buttons: ['Ok']
        });
        alert.present();
      }
      
    }
  }

  signup(){
    this.navCtrl.push('RegisterPage', this.user);
  }

    async ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');

      //await this.authPrv.getStatus();

      if(this.authPrv._authState && this.authPrv._authState.email){
        this.navCtrl.setRoot(TabsPage);
      }
      this.loading.dismiss();

      /*
      this.authPrv.getStatus().subscribe(checkOnline => {
        if(checkOnline && checkOnline.email){
          this.navCtrl.setRoot(TabsPage);
        }
      });
      */


  }


  async loginGoogle (){
    try{
      
      const res = await this.authPrv.loginWithGoogle();
      if(res){
        this.navCtrl.setRoot(TabsPage);
      }
      
    }catch(error){
      console.error(error);
    }
  }

}
