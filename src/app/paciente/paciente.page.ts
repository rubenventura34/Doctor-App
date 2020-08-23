import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, NavParams, LoadingController, NavController } from '@ionic/angular';
import { Paciente } from '../models/paciente';
import { PacientesService } from '../services/pacientes.service';
import * as moment from "moment";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private pacientes: PacientesService,
    private navCtrl: NavController
    ) {
    this.api_token.token = activatedRoute.snapshot.paramMap.get("token");
  }
  api_token = {
    token: ''
  }
  
  paciente: Paciente;
  reportes = [];
  ngOnInit() {
    moment.lang("es");
  }
  ionViewWillEnter(){
    this.getPaciente();
  }
  async getPaciente(){
    const loading = await this.loadingCtrl.create({
      message: "Obteniendo información del paciente"
    });
    await loading.present();
    this.pacientes.getPaciente(this.api_token).subscribe(data => {
      if (data.isValid) {
        this.paciente = data.userData;
        this.reportes = data.reportes;
        loading.dismiss();
      }
    }, err => {
      console.log(err);
      loading.dismiss();
    })
  }
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  newReport() {
    this.navCtrl.navigateForward(["/main/reporte", this.api_token.token]);
  }
  formatDate(date){
    return moment().date(date.substring(10)).format("LL");
  }

}
