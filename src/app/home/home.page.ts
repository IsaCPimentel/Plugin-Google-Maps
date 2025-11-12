import { Component, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild('map')mapRef!: ElementRef;
  map!: GoogleMap;

  constructor(
    private modalCtrl: ModalController,

  ) {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-google-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          // coordenadas de Belo Horizonte
          lat: -20.0,
          lng: -43.75,
        },
        zoom: 7
      },
    });
    this.addMarkers();
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: -19.88,
          lng: -43.95
        },
        title: 'Colibri',
        snippet: 'Escritório de Belo Horizonte'
      },
      {
        coordinate: {
          lat: -23.33,
          lng: -46.38
        },
        title: 'Liberdade',
        snippet: 'Bairro da Liberdade em São Paulo'
      },
    ];
    
    const result =  await this.map.addMarkers(markers);
    console.log(result);

    this.map.setOnMarkerClickListener(async(marker) => {
      
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3,
      });
      await modal.present();
    });
  }
}
