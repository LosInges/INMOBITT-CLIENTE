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
    if (
      this.cliente.apellido.trim().length <= 0 ||
      this.cliente.nombre.trim().length <= 0 ||
      this.cliente.correo.trim().length <= 0 ||
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
      if (this.cliente.password === this.confirmPassword) {
        if (
          this.cliente.apellido.trim().length > 0 &&
          this.cliente.correo.match(
            '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
              '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
          ) &&
          this.cliente.nombre.trim().length > 0 &&
          this.cliente.password.trim().length > 0
        ) {
          //validar
        if (this.confirmPassword === this.cliente.password) {
        this.loginService
          .solicitarRegistro(this.cliente.correo)
          .subscribe((solicitud) => {
            if (solicitud.permiso) {
              this.clienteService
                .postCliente(this.cliente)
                .subscribe((res) => {
                  if (res.results) {
                    this.modalController.dismiss();
                  } else {
                    console.log(res);
                    this.mostrarAlerta(
                      'Completado',
                      'Creación',
                      'Inmobiliaria creada exitosamente.'
                    );
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
      } else {
        this.mostrarAlerta(
          'Error:',
          'Confirmación de clave incorrecta',
          '¿es correcta o esta vacia?'
        );
      }
        }
      } else {
        this.mostrarAlerta(
          'Error',
          'Campos vacios',
          'No deje espacios en blanco.'
        );
      }
    }
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
