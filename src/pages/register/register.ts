import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../models/user';
import { AngularFireAuth } from "angularfire2/auth";



/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth) {
    this.user = navParams.get("user");
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  ionViewWillLoad() {
    console.log('ionViewWillLoad RegisterPage');
  }

  async signup(user : User){
    
    try{
      const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }catch(Error){
      console.error(Error);
    }
  }

}
