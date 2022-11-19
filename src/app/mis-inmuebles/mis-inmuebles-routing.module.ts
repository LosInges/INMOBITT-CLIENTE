import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisInmueblesPage } from './mis-inmuebles.page';

const routes: Routes = [
  {
    path: '',
    component: MisInmueblesPage
  },
  {
    path: ':inmobiliaria/:proyecto/inmueble/:titulo',
    loadChildren: () => import('./inmueble/inmueble.module').then( m => m.InmueblePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisInmueblesPageRoutingModule {}
