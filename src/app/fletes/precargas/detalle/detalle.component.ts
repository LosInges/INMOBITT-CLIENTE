import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Precarga } from 'src/app/interfaces/precarga';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() fecha: string;
  @Input() precarga: Precarga;
  empresa: string;

  constructor(
    private modalControler: ModalController,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.empresa = empresa;
      //precarga service ..()
    });
  }

  cerrar() {
    this.modalControler.dismiss();
  }
}
