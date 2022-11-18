import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InmobiliariaPageRoutingModule } from './inmobiliaria-routing.module';

import { InmobiliariaPage } from './inmobiliaria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InmobiliariaPageRoutingModule
  ],
  declarations: [InmobiliariaPage]
})
export class InmobiliariaPageModule {}
