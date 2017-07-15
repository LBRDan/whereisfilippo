import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../models/user';

import { AuthProvider } from '../../providers/auth/auth';
import { App } from "ionic-angular/index";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user  = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams, public authPrv: AuthProvider, public app: App) {
    console.log(this.authPrv._authState);
    if(this.authPrv._authState){
      this.user.email = this.authPrv._authState.email;
      this.user.fullName = this.authPrv._authState.displayName;
      this.user.avatarUrl = this.authPrv._authState.photoURL;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  async logoff (){
    try{
      var result = await this.authPrv.logOff();
      if(result){
        this.app.getRootNav().setRoot(LoginPage);
      }

    }catch(_errLogoff){
      console.error(_errLogoff);
    }

  }

}
