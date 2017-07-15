import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';

import {
  AboutPage
} from '../about/about';
import {
  ContactPage
} from '../contact/contact';
import {
  HomePage
} from '../home/home';

import {
  SettingsPage
} from '../settings/settings';

import {
  MapPage
} from '../map/map';

import {
  AngularFireAuth
} from "angularfire2/auth";


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabs : Array<any> = []  ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
    private toastCtrl: ToastController) {

    this.tabs.push({page : HomePage, icon : "home", name: "Home" });
    this.tabs.push({page : AboutPage, icon : "information-circle", name: "About" });
    this.tabs.push({page : ContactPage, icon : "contacts", name: "Contacts" });
    this.tabs.push({page : MapPage, icon : "map", name: "Map" });
    this.tabs.push({page : SettingsPage, icon : "settings", name: "Settings" });


    console.log(navParams);

  }

  ionViewWillLoad() {
    /*
    this.afAuth.authState.subscribe(data => {
      console.log(data);
      let optionToast = {};
      if (data && data.email) {
        optionToast = {
          message: "Welcome Back " + data.email,
          showCloseButton: true,
          position: "top"
        }
      } else {
        optionToast = {
          message: "Cannot get auth information, please login again.",
          showCloseButton: true,
          position: "top"
        }

      }

      this.toastCtrl.create(optionToast).present();
    });
    */
  }
}