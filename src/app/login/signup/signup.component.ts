import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
  };
  confirmPassword = '';

  constructor(
    private modalController: ModalController,
    private clienteService: ClienteService,
    private alertCtrl: AlertController,
    private router: Router,
    private loginService: LoginService
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
    this.router.navigate(['/', 'login']);
  }

  ngOnInit() {}

  onSubmit() {
    if (this.validaciones() == true) {
      //validar
      this.loginService
        .solicitarRegistro(this.cliente.correo)
        .subscribe((solicitud) => {
          if (solicitud.permiso) {
            this.clienteService.postCliente(this.cliente).subscribe((res) => {
              if (res.results) {
                this.mostrarAlerta('Completado', 'BIENVENIDO', '');
                this.modalController.dismiss();
              } else {
                console.log(res);
                this.mostrarAlerta('ERROR', 'error servidor', 'intente de nuevo');
                this.cerrar();
              }
            });
          } else {
            this.mostrarAlerta(
              'Error:',
              'Correo ya registrado',
              'Favor de introducir otro correo.'
            );
          }
        });
    }
  }

  validaciones(): Boolean {
    if (
      this.cliente.apellido.trim().length <= 0 ||
      this.cliente.nombre.trim().length <= 0 ||
      this.cliente.correo.trim().length <= 0 ||
      this.cliente.password.trim().length <= 0
    ) {
      this.mostrarAlerta(
        'Error',
        'Campos vacios',
        'No deje espacios en blanco.'
      );
      return false;
    }

    if (!this.cliente.correo.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      this.mostrarAlerta('Error:', 'Revise el formato del correo', 'por favor');
      return false;
    }

    if (!this.cliente.apellido.match(/^[_a-zA-Z ]+$/)) {
      this.mostrarAlerta('Error:', 'Revise del campo apellido', 'por favor');
      return false;
    }
    if (!this.cliente.nombre.match(/^[_a-zA-Z]+$/)) {
      this.mostrarAlerta('Error:', 'Revise del campo nombre', 'por favor');
      return false;
    }
    if (this.confirmPassword !== this.cliente.password) {
      this.mostrarAlerta(
        'Error:',
        'Confirmación de clave incorrecta',
        '¿Es correcta o esta vacia?'
      );
      return false;
    }
    console.log('TODO OK EN VALIDACIONES');
    return true;
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
