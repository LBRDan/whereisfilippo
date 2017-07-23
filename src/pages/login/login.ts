import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  myForm : any ;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authPrv: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl : AlertController,
    public formBuilder: FormBuilder) {
    
    this.myForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.minLength(8), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present().then(res => {
      console.log(res);
    });
  }

  async login (user:User){
    console.log("Login")
    if(!this.myForm.valid){
      return ;
    }
    try{      
      const res = await this.authPrv.loginWithEmailAndPassword(user.email,user.password);
      if(res){
        this.goToHomePage();
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

    let authSub = this.authPrv.getStatus().subscribe(data => {
      // could use data, but this it's hacky...
      if(this.authPrv._authState && this.authPrv._authState.email){
        this.goToHomePage();
      }
      authSub.unsubscribe();
      this.loading.dismissAll();
    });


  }

  goToHomePage() {
    this.navCtrl.setRoot('TabsPage');
  }


  async loginGoogle (){
    try{
      
      const res = await this.authPrv.loginWithGoogle();
      if(res){
        this.goToHomePage();
      }
      
    }catch(error){
      console.error(error);
    }
  }

}
