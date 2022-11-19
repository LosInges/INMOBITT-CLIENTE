import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresa';
import { ModalController } from '@ionic/angular';
import { MueblesService } from './../../../services/muebles.service';
import { Precarga } from 'src/app/interfaces/precarga';
import { PrecargaService } from 'src/app/services/precarga.service';

@Component({
  selector: 'app-precarga',
  templateUrl: './precarga.component.html',
  styleUrls: ['./precarga.component.scss'],
})
export class PrecargaComponent implements OnInit {
  fecha: string = new Date().toISOString();
  @Input() empresas: Empresa[];
  @Input() correo: string;
  @Input() id: string;
  muebles = this.muebleService.getMuebles();

  precarga: Precarga = {
    id: '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_chicas: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_grandes: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_medianas: 0,
    muebles: [],
    empresa: '',
    cliente: '',
    destino: {
      lat: 0,
      lng: 0,
    },
    fecha: '',
    hora: '',
    origen: {
      lat: 0,
      lng: 0,
    },
    telefono: '',
  };

  constructor(
    private precargaService: PrecargaService,
    private modalController: ModalController,
    private muebleService: MueblesService,
    private alertController: AlertController
  ) {}

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  ngOnInit() {
    this.precarga.id = this.id;
    this.precarga.cliente = this.correo;
  }

  registrarPrecarga() {
    if (
      this.precarga.telefono.trim().length <= 0 ||
      this.precarga.origen == null ||
      this.precarga.destino == null ||
      this.precarga.muebles.toString() == 'Muebles'
    ) {
      this.mostrarAlerta(
        'Error',
        'Campos vacios',
        'No deje espacios en blanco.'
      );
    } else {
      this.precarga.fecha = this.fecha.split('T')[0];
      this.precarga.hora = this.fecha
        .split('T')[1]
        .split('.')[0]
        .substring(0, 5);
      this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
        if (res.results) this.modalController.dismiss(this.precarga);
        else console.log(res);
      });
    }
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
