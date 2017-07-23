import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  geoWatcher : any ;

  userPosition : any ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private geoLoc : Geolocation,
    public alertCtrl : AlertController
  ) {
    geoLoc.getCurrentPosition().then((resp) => {
      console.log(resp);
    
    }).catch((error) => {
      console.log('Error getting location', error);
      this.alertCtrl.create({
        title: 'Error gathering geolocation data',
        subTitle: error.message,
        buttons: ['Ok']
      }).present();
    });
  }

  ionViewDidLoad(){
    this.initMap();
  }
  
  
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);

    this.userPosition = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                                        new google.maps.Size(22,22),
                                                        new google.maps.Point(0,18),
                                                        new google.maps.Point(11,11)),
        shadow: null,
        zIndex: 999,
        map: this.map
    });

    this.geoWatcher = this.geoLoc.watchPosition();
    this.geoWatcher.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      if(data.coords){
        console.log("Sub data ->", data);
        let newPos = new google.maps.LatLng( data.coords.latitude, data.coords.longitude );
        this.map.setCenter( newPos );
        this.map.setZoom(17);
        this.userPosition.setPosition( newPos );
      }else{
        console.warn("ERROR GAINING DATA", data);
        
      }
    });


    
  }

  

}
