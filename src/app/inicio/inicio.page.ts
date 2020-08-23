import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { NavigationExtras } from '@angular/router'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
  	private alert : AlertController,
  	private navCtrl: NavController,
  	private barcodeScanner: BarcodeScanner,
  	private platform: Platform
  	) { }

  ngOnInit() {
    
  }
  scanQR(){
  	if (this.platform.is("ios") || this.platform.is("android")) {
  		this.barcodeScanner.scan().then(data => {
        let dataReaded = JSON.parse(data.text);
         this.continuar(dataReaded[0].token);
      })
  	} else {
  		this.requestToken();
  	}
  	
  }
  async requestToken(){
  	const alert = await this.alert.create({
  		header: 'Ingresa el token',
  		inputs: [{
  			type: 'text',
  			name: 'token',
  			placeholder: 'token..'
  		}],
  		buttons: [{
  			text: 'Cancelar',
  			role: 'cancel'
  		}, {
  			text: 'Aceptar',
  			handler: data => {
  				this.continuar(data.token)
  			}
  		}]
  	});
  	await alert.present();
  }
  continuar(api_token){
  	this.navCtrl.navigateForward(["/main/paciente", api_token]);
  }
  

}
