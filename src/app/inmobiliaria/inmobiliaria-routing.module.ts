import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InmobiliariaPage } from './inmobiliaria.page';

const routes: Routes = [
  {
    path: '',
    component: InmobiliariaPage
  },
  {
    path: 'perfil/:inmobiliaria',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'proyectos/:inmobiliaria',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InmobiliariaPageRoutingModule {}
