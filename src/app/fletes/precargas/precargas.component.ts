import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/interfaces/estado';
import { EstadosService } from 'src/app/services/estados.service';
import { DetalleComponent } from './detalle/detalle.component';
import { SessionService } from 'src/app/services/session.service';
import { PrecargaComponent } from './precarga/precarga.component';
import { Precarga } from 'src/app/interfaces/precarga';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PrecargaService } from 'src/app/services/precarga.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-precargas',
  templateUrl: './precargas.component.html',
  styleUrls: ['./precargas.component.scss'],
})
export class PrecargasComponent implements OnInit {
  estados: Estado[] = this.estadosService.getEstados();
  precargas: Precarga[];
  empresas: Empresa[];
  empresa: string;
  correo: string;

  constructor(
    private empresaService: EmpresaService,
    private estadosService: EstadosService,
    private precargaService: PrecargaService,
    private modalControler: ModalController,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.sessionService.get('correo').then((correo: string) => {
      this.correo = correo;
      this.empresaService
        .getEmpresas()
        .subscribe((empresas) => (this.empresas = empresas));

      this.precargaService.getPrecargas(correo).subscribe((precargas) => {
        console.log(precargas);
        this.precargas = precargas;
      });
    });
  }

  async abrirDetalle(precarga: Precarga) {
    let hr = Number(precarga.hora.split(':')[0]);
    hr = hr >= 6 ? hr - 6 : hr + 18;

    const fecha = new Date(
      Number(precarga.fecha.split('-')[0]), //AÑO
      Number(precarga.fecha.split('-')[1]) - 1, //MES (INDICE)
      Number(precarga.fecha.split('-')[2]), //DÍA
      hr, //HORA
      Number(precarga.hora.split(':')[1]) //MINUTOS
    );
    const modal = await this.modalControler.create({
      component: DetalleComponent,
      componentProps: { precarga, fecha: fecha.toISOString() },
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((val) => {
      if (val.data) {
        this.precargas = this.precargas.filter((p) => precarga !== p);
      }
    });
    return await modal.present();
  }

  async abrirRegistro() {
    const modal = await this.modalControler.create({
      component: PrecargaComponent,
      componentProps: {
        empresas: this.empresas,
        correo: this.correo,
        id: uuidv4(),
      },
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((val) => {
      if (val.data) {
        if (this.precargas.length === 0) {
          this.precargas = [val.data];
        } else {
          this.precargas.push(val.data);
        }
      }

      console.log(val);
    });
    return await modal.present();
  }

  cerrar() {
    this.modalControler.dismiss();
  }

  eliminar(precarga: Precarga) {
    this.precargaService
      .deletePrecarga(this.correo, precarga.id, precarga.empresa)
      .subscribe((val) => {
        this.precargas = val.results
          ? this.precargas.filter((p) => p !== precarga)
          : this.precargas;
        console.log(val);
      });
  }
}
