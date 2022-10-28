import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';


  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  onSubmit() {
    alert(this.email + ', ' + this.password);
  }

  login() {
    this.loginService
      .login(this.email, this.password)
      .subscribe((respuesta) => {
        console.log(respuesta);
        if (respuesta.session.tipo !== 'cliente')   {
          console.log('NO es Cliente');
          this.presentAlert()
          return;
        }
        const promesa: Promise<any>[] = [
          this.sessionService.set('tipo', respuesta.session.tipo),
          this.sessionService.set('correo', respuesta.session.email),
        ];

        Promise.all(promesa).then(() => {
          this.cerrar()
        });

      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'USUARIO INVÁLIDO',
      subHeader: 'Este no es un correo válido',
      message: 'Recuerde bien su correo y contraseña',
      buttons: ['OK'],
    });

    await alert.present();
  }
  cerrar(){
    this.modalController.dismiss();
  }
}
