import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { Cliente } from '../interfaces/cliente';
import { ClienteService } from '../services/cliente.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  cliente: Cliente = {
    correo: '',
    nombre: '',
    password: '',
    apellido: '',
  };
  confirmPassword = '';
  constructor(
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private router: Router,
    private alertCtrl: AlertController,
    private alertController: AlertController
  ) {}

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

  ngOnInit() {
    this.sessionService.get('correo')?.then((correo) => {
      if (correo) {
        this.clienteService
          .getCliente(correo)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  async actualizarCliente() {
    this.validarCampos();
  }
  validarCampos() {
    if (
      this.cliente.apellido.trim().length <= 0 ||
      this.cliente.nombre.trim().length <= 0 ||
      this.cliente.password.trim().length <= 0
    ) {
      this.clienteService.postCliente(this.cliente)?.subscribe((val) => {
        console.log(val);
        this.mostrarAlerta(
          'Error',
          'Campos vacios',
          'No deje espacios en blanco.'
        );
      });
    } else {
      this.presentarAlert1();
    }
  }
  async presentarAlert1() {
    const alert = await this.alertController.create({
      header: 'Confirmar Contraseña',
      inputs: [
        {
          name: 'password',
          placeholder: 'Contraseña',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          role: 'accept',
        },
      ],
    });
    alert.onDidDismiss().then((data) => {
      if (this.cliente.password === data.data.values.password) {
        this.clienteService.postCliente(this.cliente)?.subscribe((val) => {
          console.log(val);
          window.location.reload();
        });
      } else {
        this.mostrarAlerta(
          'Error:',
          'Confirmación de clave incorrecta',
          '¿es correcta o esta vacia?'
        );
      }
    });
    await alert.present();
  }

  eliminarCuenta() {
    this.presentarAlert();
  }

  async presentarAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar Contraseña',
      inputs: [
        {
          name: 'password',
          placeholder: 'Contraseña',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          role: 'accept',
        },
      ],
    });
    alert.onDidDismiss().then((data) => {
      if (this.cliente.password === data.data.values.password) {
        this.clienteService
          .deleteCliente(this.cliente.correo)
          ?.subscribe((val) => {
            if (val.results) {
              this.sessionService.clear().then(() => {
                this.router.navigate(['']);
              });
            } else {
              this.mostrarAlerta(
                'Error',
                'Fallo en eliminación de cuenta',
                'Intente de nuevo'
              );
            }
          });
      } else {
        this.mostrarAlerta(
          'Error:',
          'Confirmación de clave incorrecta',
          '¿es correcta o esta vacia?'
        );
      }
    });
    await alert.present();
  }
}
