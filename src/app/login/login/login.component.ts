import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private alertController: AlertController
  ) {}

  async mostrarAlerta(titulo:string, subtitulo:string, mensaje:string) {  
    const alert = await this.alertController.create({  
      header: titulo,  
      subHeader: subtitulo,  
      message: mensaje,  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  } 

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
          this.mostrarAlerta("Error:", "Correo inválido", "Recuerde bien su correo y contraseña")
          return;
        }
        const promesa: Promise<any>[] = [
          this.sessionService.set('tipo', respuesta.session.tipo),
          this.sessionService.set('correo', respuesta.session.email),
        ];

        Promise.all(promesa).then(() => {
          this.cerrar()
          this.router.navigate(['/', 'perfil'])
        });
      });
  }
 
  cerrar(){
    this.modalController.dismiss();
  }
}
