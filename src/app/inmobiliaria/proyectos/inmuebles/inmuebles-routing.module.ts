import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InmueblesPage } from './inmuebles.page';

const routes: Routes = [
  {
    path: '',
    component: InmueblesPage
  },
  {
    path: 'inmueble/:titulo',
    loadChildren: () => import('./inmueble/inmueble.module').then( m => m.InmueblePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InmueblesPageRoutingModule {}
