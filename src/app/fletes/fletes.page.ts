import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Direccion } from '../interfaces/direccion';
import { Flete } from '../interfaces/flete';
import { MapsComponent } from '../maps/maps.component';
import { FletesService } from '../services/fletes.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-fletes',
  templateUrl: './fletes.page.html',
  styleUrls: ['./fletes.page.scss'],
})
export class FletesPage implements OnInit {
  fletes: Flete[] = [];
  constructor(
    private fletesService: FletesService,
    private router: Router,
    private sessionService: SessionService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.sessionService.get('correo')?.then((correo) => {
      this.fletesService.getFletesC(correo).subscribe((fletes) => {
        this.fletes = fletes;
      });
    });
  }

  eliminar(flete: Flete) {
    this.fletesService.deleteFlete(flete).subscribe((val) => {
      this.fletes = val.results
        ? this.fletes.filter((f) => f !== flete)
        : this.fletes;
    });
  }

  navegar(flete: Flete) {
    this.router.navigate(['/', 'fletes', flete.id, 'paquetes']);
  }

  async verPosicion(position: Direccion) {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position },
      cssClass: 'modalGeneral',
    });
    return modal.present();
  }
}
