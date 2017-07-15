import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AlertController } from 'ionic-angular';


import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { ToastController } from 'ionic-angular';
import { NavController, App } from "ionic-angular/index";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public _authState : any = null;
  private nav:NavController;

  constructor(public angularFire: AngularFireAuth, public toastCtrl : ToastController,
  private alertCtrl: AlertController,
  private app:App) {
    console.log('Hello AuthProvider Provider');
    this.nav = app.getActiveNav();
  }

  async loginWithGoogle() {
    return this.angularFire.auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(data => {
      console.log(data);
      this.monitorState();
      return Promise.resolve(data)
    });
  }

  loginWithEmailAndPassword(email: string, password : string) {
    return this.angularFire.auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      this.monitorState();
      return Promise.resolve(res)
    });
  }

  getStatus (){
    return this.angularFire.authState.map(data => this._authState = data );
  }

  monitorState(){
    this.getStatus().subscribe(data => {
      console.log(data);
      this._authState = data ;
      let optionToast = {};

      if(!data){
        console.log("noAuth");
        optionToast = {
            message: "Cannot get auth information, please login again.",
            showCloseButton: true,
            position: "top",
            duration: 1500
        }
      }else{
        if (data.email) {
          optionToast = {
            message: "Welcome Back " + data.email,
            showCloseButton: true,
            position: "top",
            duration: 1500
          }
        }

      }
      this.toastCtrl.create(optionToast).present();
    })
  }

  async logOff() {
    return this.angularFire.auth.signOut().then(() => {
      console.log("Logged Off");
      return Promise.resolve("OK");
    });
  }


}
