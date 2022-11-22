import { AlertController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import { MapsComponent } from 'src/app/maps/maps.component';
import { MueblesService } from 'src/app/services/muebles.service';
import { Precarga } from 'src/app/interfaces/precarga';
import { PrecargaService } from './../../../services/precarga.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  minimo = new Date().toISOString();
  @Input() fecha: string;
  @Input() precarga: Precarga;
  empresa: string;
  muebles = this.muebleService.getMuebles();

  constructor(
    private modalControler: ModalController,
    private sessionService: SessionService,
    private modalController: ModalController,
    private alertConttroller: AlertController,
    private precargaService: PrecargaService,
    private muebleService: MueblesService
  ) {}

  ngOnInit() {
    this.precarga.muebles.forEach((mueble) =>
      this.muebleService.updateMueble(mueble)
    );
    this.sessionService.get('empresa')?.then((empresa) => {
      this.empresa = empresa;
    });
  }

  async guardarOrigen() {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position: this.precarga.origen },
      cssClass: 'modalGeneral',
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
      componentProps: { position: this.precarga.destino },
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
    if (this.validaciones() == true) {
      this.precarga.fecha = this.fecha.split('T')[0];
      this.precarga.hora = this.fecha
        .split('T')[1]
        .split('.')[0]
        .substring(0, 5);
      this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
        if (res.results) {
          this.alertConttroller
            .create({
              header: 'ÉXITOSAME',
              message: 'Se ACTUALIZÓ la Precarga',
              buttons: ['CERRAR'],
            })
            .then((alert) => {
              alert.present();
            });
           this.cerrar()
        } else console.log(res);
      });
    }
  }
  validaciones(): Boolean {
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

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertConttroller.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  cerrar() {
    this.modalControler.dismiss();
  }
}
