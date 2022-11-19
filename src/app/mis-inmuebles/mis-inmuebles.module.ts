import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisInmueblesPageRoutingModule } from './mis-inmuebles-routing.module';

import { MisInmueblesPage } from './mis-inmuebles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisInmueblesPageRoutingModule
  ],
  declarations: [MisInmueblesPage]
})
export class MisInmueblesPageModule {}
