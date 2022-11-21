import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Agente } from 'src/app/interfaces/agente';
import { AgenteService } from 'src/app/services/agente.service';
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
  api = environment.api;
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
  constructor(
    private sessionService: SessionService,
    private inmuebleService: InmuebleService,
    private activatedRoute: ActivatedRoute,
    private agenteService: AgenteService,
    private notarioService: NotarioService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
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
            });
        }
      });
    });
  }

  quitar() {
    this.inmuebleService
      .deleteInmuebleCliente(this.inmueble)
      .subscribe((val) => {
        if (val.results) {
          this.mostrarAlerta(
            'Exitosamente',
            'Se a cancelado la negociación',
            ''
          );
          console.log('se quitó');
        } else {
          console.log(val);
        }
      });
  }

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    alert.onDidDismiss().then((res) => {
      this.router.navigate(['/', 'mis-inmuebles']);
    });

    return alert.present();
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
