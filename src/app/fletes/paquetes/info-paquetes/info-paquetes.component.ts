import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cargador } from 'src/app/interfaces/cargador';
import { TransporteFlete } from 'src/app/interfaces/transporte-flete';
import { CargadoresService } from 'src/app/services/cargadores.service';
import { FletesService } from 'src/app/services/fletes.service';
import { SessionService } from 'src/app/services/session.service';
import { TransporteFleteService } from 'src/app/services/transporte-flete.service';
@Component({
  selector: 'app-info-paquetes',
  templateUrl: './info-paquetes.component.html',
  styleUrls: ['./info-paquetes.component.scss'],
})
export class InfoPaquetesComponent implements OnInit {
  cargadores: Cargador[] = [];
  @Input() transporteFlete: TransporteFlete;

  constructor(
    private modalController: ModalController,
    private cargadoresService: CargadoresService,
    private fleteService: FletesService
  ) {}

  ngOnInit() {
    this.fleteService
      .getFlete(this.transporteFlete.flete)
      .subscribe((flete) => {
        this.transporteFlete.cargadores?.forEach((rfc) => {
          this.cargadoresService
            .getCargador(flete.empresa, rfc)
            .subscribe((cargador) => {
              this.cargadores.push(cargador);
            });
        });
      });
  }

  cerrar() {
    this.modalController.dismiss()
  }
}
