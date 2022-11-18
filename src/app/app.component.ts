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

    { title: 'Perfil', url: '/perfil/', icon: 'mail' },
    { title: 'Inmobiliarias', url: '/inmobiliaria', icon: 'business' },
    { title: 'Fletes', url: '/fletes', icon: 'heart' },
    {
      title: 'Cerrar Sesion',
      url: '',
      click: () => this.sesionService.clear(),
      icon: 'log-out-outline',
    },
    ];

  constructor(private sesionService: SessionService) {}

  click(funcion: any) {
    if (funcion) {
      funcion();
    }
  }
}
