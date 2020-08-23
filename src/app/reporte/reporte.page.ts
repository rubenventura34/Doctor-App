import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { PacientesService } from '../services/pacientes.service';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  token_paciente = null;
  constructor(
    private loading : LoadingController,
    private toast : ToastController,
    private navCtrl : NavController,
    private storage : StorageService,
    private activatedRoute: ActivatedRoute,
    private pacientes : PacientesService
    ) {
    this.reporte.token_paciente = this.activatedRoute.snapshot.paramMap.get("token");
  }

  ngOnInit() {
  }
  reporte = {
    api_token: '',
    token_paciente: '',
    temperatura: '',
    disnea: false,
    cansancio: false,
    dolor_de_cabeza: false,
    congestion: false,
    diarrea: false,
    dolor_de_garganta: false,
    observaciones: ''
  }
  async enviar(){
    const loading = await this.loading.create({
      message: 'Enviando reporte...'
    });
    loading.present();
  	this.storage.get('sessionData').then(sessionData => {
      this.reporte.api_token = sessionData.userData.api_token;

      this.pacientes.enviarReporte(this.reporte).subscribe(async result => {
        loading.dismiss();
        const toast = await this.toast.create({
          message: result.mensaje,
          duration: 2000
        });
        toast.present();
        if (!result.error) {
          this.navCtrl.navigateBack(["/main/paciente", this.reporte.token_paciente]);
        }
      }, err => {
        loading.dismiss();
      });
    });
  }

}
