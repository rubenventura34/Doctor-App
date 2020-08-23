import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/main/Inicio',
      icon: 'home'
    },
    {
      title: 'Pacientes',
      url: '/main/paciente',
      icon: 'people'
    },
    {
      title: 'Reportes',
      url: '/main/reporte',
      icon: 'folder-open'
    },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
	doctor = {
    nombre: '',
    correo: ''
  };
  isLogin = false;
  ngOnInit() {
    const path = window.location.pathname.split('main/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  ionViewWillEnter(){
    this.storage.get('sessionData').then(sessionData => {
      if(sessionData) {
        
        this.doctor.nombre = sessionData.userData.nombres.split(" ")[0]+" "+sessionData.userData.apellidos.split(" ")[0];
        this.doctor.correo = sessionData.userData.correo;

      this.isLogin = true;
      }
    });
  }
  logout(){
    this.auth.logout();
  }
}
