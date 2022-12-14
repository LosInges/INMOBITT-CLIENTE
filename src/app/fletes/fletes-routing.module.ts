import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FletesPage } from './fletes.page';
import { DetallePaqueteComponent } from './paquetes/detalle-paquete/detalle-paquete.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PrecargaComponent } from './precargas/precarga/precarga.component';
import { PrecargasComponent } from './precargas/precargas.component';

const routes: Routes = [
  {
    path: '',
    component: FletesPage
  },

  {
    path: 'precargas',
    component: PrecargasComponent,
  },
  {
    path: 'precarga/:id',
    component: PrecargaComponent,
  },
  {
    path: ':id/paquetes',
    component: PaquetesComponent,
  },
  {
    path: ':flete/paquetes/:id/items',
    component: DetallePaqueteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {}
