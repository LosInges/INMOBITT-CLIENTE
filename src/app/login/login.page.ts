import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ModalController } from '@ionic/angular';
import { SessionService } from './../services/session.service';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(
    private modalController: ModalController,
  ) {}

  ngOnInit() {}

  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'modalRegistrar',
    });
    return await modal.present();
  }

  async abrirIngresar() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'modalIngresar',
    });
    return await modal.present();
  }
}
