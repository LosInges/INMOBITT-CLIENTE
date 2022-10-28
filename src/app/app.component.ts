import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  [x: string]: any;
  public appPages = [

    { title: 'Iniciar Sesión', url: '/login', icon: 'trash' },
    { title: 'Perfil', url: '/perfil/', icon: 'mail' },
    { title: 'Inmobiliarias', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Fletes', url: '/folder/Favorites', icon: 'heart' },
    {
      title: 'Cerrar Sesion',
      url: '',
      click: () => this.sesionService.clear(),
      icon: 'log-out-outline',
    },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  constructor(private sesionService: SessionService) {}

  click(funcion: any) {
    if (funcion) {
      funcion();
    }
  }
}
