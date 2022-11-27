import { Component, Input, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Empresa } from 'src/app/interfaces/empresa';
import { MapsComponent } from 'src/app/maps/maps.component';
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
  @Input() empresas: Empresa[];
  @Input() correo: string;
  @Input() id: string;
  fecha: string = new Date().toISOString();
  muebles = this.muebleService.getMuebles();
  minimo = new Date().toISOString();

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
    if (this.validaciones()) {
      this.precarga.fecha = this.fecha.split('T')[0];
      this.precarga.hora = this.fecha
        .split('T')[1]
        .split('.')[0]
        .substring(0, 5);
      this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
        if (res.results) {
          this.modalController.dismiss(this.precarga);
          this.alertController
            .create({
              header: 'ÉXITOSAME',
              message: 'Se REGISTRÓ la Precarga',
              buttons: ['CERRAR'],
            })
            .then((alert) => {
              alert.present();
            });
          this.cerrar();
        } else {
          console.log(res);
        }
      });
    }
  }

  async guardarOrigen() {
    const modal = await this.modalController.create({
      component: MapsComponent,
      cssClass: 'modalGeneral',
      componentProps: { position: this.precarga.origen },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.precarga.origen = res.data.pos;
      }
    });
    return modal.present();
  }
  async guardarDestino() {
    const modal = await this.modalController.create({
      component: MapsComponent,
      cssClass: 'modalGeneral',
      componentProps: { position: this.precarga.destino },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.precarga.destino = res.data.pos;
      }
    });
    return modal.present();
  }

  validaciones(): boolean {
    if (this.precarga.telefono.trim().length <= 0) {
      this.mostrarAlerta(
        'Error',
        'Campo de telefono vacio',
        'No deje espacios en blanco.'
      );
      return false;
    }
    if (this.precarga.origen == null) {
      this.mostrarAlerta(
        'Error',
        'Campo de origen',
        'No deje espacios en blanco.'
      );
      return false;
    }
    if (this.precarga.destino == null) {
      this.mostrarAlerta(
        'Error',
        'Campo de destino',
        'No deje espacios en blanco.'
      );
      return false;
    }
    if (this.precarga.cajas_chicas < 0) {
      this.mostrarAlerta('Error', 'Campo negativo', 'No coloque números neg.');
      return false;
    }
    if (this.precarga.cajas_grandes < 0) {
      this.mostrarAlerta('Error', 'Campo negativo', 'No coloque números neg.');
      return false;
    }
    if (this.precarga.cajas_medianas < 0) {
      this.mostrarAlerta('Error', 'Campo negativo', 'No coloque números neg.');
      return false;
    }
    if (this.precarga.muebles.length > 0) {
      let valido = true;
      this.precarga.muebles.forEach((mueble) => {
        if (mueble.cantidad <= 0) {
          valido = false;
          return;
        }
      });
      if (!valido) {
        this.mostrarAlerta(
          'Error',
          'muebles',
          'Todos los muebles deben ser mayores a 0'
        );
        console.log('inmuebles invalidos');
        return false;
      }
    }
    if (this.precarga.empresa.length <= 0) {
      this.mostrarAlerta(
        'Error',
        'Escoja una empresa',
        'Recuerde que se tienen que rellenar todos los campos'
      );
      console.log('inmuebles invalidos');
      return false;
    }

    return true;
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
