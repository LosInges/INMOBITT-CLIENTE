/* eslint-disable @typescript-eslint/naming-convention */
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Agente } from 'src/app/interfaces/agente';
import { AgenteService } from 'src/app/services/agente.service';
import { Imagen } from 'src/app/interfaces/imagen';
import { Inmueble } from 'src/app/interfaces/inmueble';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { MapsComponent } from 'src/app/maps/maps.component';
import { Notario } from 'src/app/interfaces/notario';
import { NotarioService } from 'src/app/services/notario.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.page.html',
  styleUrls: ['./inmueble.page.scss'],
})
export class InmueblePage implements OnInit {
  imagenes: Imagen[] = [];
  inmueble: Inmueble = {
    inmobiliaria: '',
    proyecto: '',
    titulo: '',
    estado: '',
    foto: '',
    direccion: {
      lat: 0,
      lng: 0,
    },
    precio_renta: 0,
    precio_venta: 0,
    cuartos: 0,
    pisos: 0,
    metros_cuadrados: 0,
    descripcion: '',
    servicios: [''],
    notario: '',
    agente: '',
    visible: true,
    borrado: true,
    cliente: '',
  };
  agente: Agente = {
    apellido: '',
    correo: '',
    foto: '',
    inmobiliaria: '',
    nombre: '',
    password: '',
    rfc: '',
    telefono: '',
  };
  notario: Notario = {
    apellido: '',
    correo: '',
    foto: '',
    inmobiliaria: '',
    nombre: '',
    rfc: '',
  };
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  api = environment.api;
  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private inmuebleService: InmuebleService,
    private router: Router,
    private agenteService: AgenteService,
    private notarioService: NotarioService,
    private modalController: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.sessionService.get('correo').then((correo) => {
      this.activatedRoute.params.subscribe((params) => {
        if (params.titulo) {
          this.inmuebleService
            .getInmueble(params.inmobiliaria, params.proyecto, params.titulo)
            .subscribe((inmueble) => {
              this.inmueble = inmueble;
              this.inmueble.cliente = correo;
              this.agenteService
                .getAgente(inmueble.inmobiliaria, inmueble.agente)
                .subscribe((agente) => {
                  this.agente = agente;
                });
              this.notarioService
                .getNotario(inmueble.inmobiliaria, inmueble.notario)
                .subscribe((notario) => {
                  this.notario = notario;
                });
              this.inmuebleService
                .getFotos(
                  inmueble.inmobiliaria,
                  inmueble.proyecto,
                  inmueble.titulo
                )
                .subscribe((imagenes) => {
                  this.imagenes = imagenes;
                  console.log(imagenes);
                });
            });
        }
      });
    });
  }

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  solicitar() {
    this.inmuebleService.postInmuebleCliente(this.inmueble).subscribe((val) => {
      if (val.results) {
        this.mostrarAlerta('Exito', 'Se registró correctamente', '');
        this.router.navigate(['/inmobiliaria'], {
          relativeTo: this.activatedRoute,
        });
      } else {
        this.mostrarAlerta('Error', 'No se registró', '');
        console.log(this.inmueble, val);
      }
    });
  }

  async verDireccion() {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position: this.inmueble.direccion },
      cssClass: 'modalGeneral',
    });

    modal.present();
  }
}
