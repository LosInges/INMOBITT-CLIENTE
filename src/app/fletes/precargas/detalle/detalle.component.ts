import { AlertController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import { MapsComponent } from 'src/app/maps/maps.component';
import { Precarga } from 'src/app/interfaces/precarga';
import { PrecargaService } from './../../../services/precarga.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() fecha: string;
  @Input() precarga: Precarga;
  empresa: string;

  constructor(
    private modalControler: ModalController,
    private sessionService: SessionService,
    private modalController: ModalController,
    private alertConttroller: AlertController,
    private precargaService: PrecargaService

  ) {}

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.empresa = empresa;
      //precarga service ..()
    });
  }

  async guardarOrigen(){
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps:{position: this.precarga.origen},
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.precarga.origen = res.data.pos;
      }
    });
    return modal.present();
  }
  async guardarDestino(){
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps:{position: this.precarga.destino},
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.precarga.destino = res.data.pos;
      }
    });
    return modal.present();
  }

  actualizar() {
    this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
      if (res.results){
        this.alertConttroller
        .create({
          header: 'ÉXITOSAME',
          message: 'Se ACTUALIZÓ la Precarga',
          buttons: ['CERRAR'],
        })
        .then((alert) => {
          alert.present();
        });
      }
      else console.log(res);
    });
  }

  cerrar() {
    this.modalControler.dismiss();
  }
}
