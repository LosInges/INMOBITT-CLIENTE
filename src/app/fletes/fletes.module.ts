import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FletesPageRoutingModule } from './fletes-routing.module';

import { FletesPage } from './fletes.page';
import { PrecargasComponent } from './precargas/precargas.component';
import { DetalleComponent } from './precargas/detalle/detalle.component';
import { PrecargaComponent } from './precargas/precarga/precarga.component';
import { PaqueteComponent } from './paquetes/paquete/paquete.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { InfoPaquetesComponent } from './paquetes/info-paquetes/info-paquetes.component';
import { DetallePaqueteComponent } from './paquetes/detalle-paquete/detalle-paquete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FletesPageRoutingModule
  ],
  declarations: [
    FletesPage,
    PrecargasComponent,
    DetalleComponent,
    PrecargaComponent,
    PaqueteComponent,
    InfoPaquetesComponent,
    PaquetesComponent,
    DetallePaqueteComponent

  ]
})
export class FletesPageModule {}
