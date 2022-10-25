import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [

    { title: 'Iniciar Sesión', url: '/login', icon: 'trash' },
    { title: 'Perfil', url: '/perfil/', icon: 'mail' },
    { title: 'Inmobiliarias', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Fletes', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Cerrar Sesión', url: '/folder/Archived', icon: 'archive' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  constructor() {}
}
