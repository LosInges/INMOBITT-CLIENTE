/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';

import { Item } from 'src/app/interfaces/item';
import { ItemsService } from 'src/app/services/items.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {
  @Input() id: string;
  @Input() total: number;
  api = environment.api;
  item: Item = {
    id: '',
    id_item: '',
    foto: '',
    item: '',
    total: 0,
    alto_item: 0,
    ancho_item: 0,
    profundidad: 0,
  };
  constructor(
    private modalController: ModalController,
    private itemService: ItemsService
  ) {}

  ngOnInit() {
    this.item.id = this.id;
    this.item.id_item = uuidv4();
    this.item.total = this.total;
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
