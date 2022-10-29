import { ModalController } from '@ionic/angular';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Precarga } from 'src/app/interfaces/precarga';
import { Flete } from 'src/app/interfaces/flete';
import { FletesService } from 'src/app/services/fletes.service';
import { TransportesService } from 'src/app/services/transportes.service';
import { TransporteFleteService } from 'src/app/services/transporte-flete.service';
import { CargadoresService } from 'src/app/services/cargadores.service';
import { TransporteFlete } from 'src/app/interfaces/transporte-flete';
import { Transporte } from 'src/app/interfaces/transporte';
import { Cargador } from 'src/app/interfaces/cargador';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit, OnChanges {
  @Input() precarga: Precarga;

  @Input() fecha: string;

  transporteFlete: TransporteFlete = {
    flete: '',
    transporte: '',
    cargadores: [],
    paquete: [],
  };
  transportes: Transporte[] = [];
  cargadores: Cargador[] = [];

  detalleFlete: Flete = {
    activo: true,
    id: '',
    empresa: 'empresa@mail.com',
    cliente: '',
    fecha: '',
    hora: '',
    telefono: '',
    destino: {
      calle: '',
      codigopostal: '',
      colonia: '',
      numeroexterior: '',
      numerointerior: '',
      estado: '',
    },
    origen: {
      calle: '',
      codigopostal: '',
      colonia: '',
      numeroexterior: '',
      numerointerior: '',
      estado: '',
    },
  };

  constructor(
    private modalController: ModalController,
    private transporteServices: TransportesService,
    private cargadoresServices: CargadoresService,
    private fletesServices: FletesService,
    private transporteFletesService: TransporteFleteService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.detalleFlete.id = this.precarga.id;
    this.detalleFlete.empresa = this.precarga.empresa;
    this.detalleFlete.cliente = this.precarga.cliente;
    this.detalleFlete.destino = this.precarga.destino;
    this.detalleFlete.origen = this.precarga.origen;
    this.detalleFlete.fecha = this.precarga.fecha;
    this.detalleFlete.hora = this.precarga.hora;
    this.detalleFlete.telefono = this.precarga.telefono;
    this.transporteServices
      .getTransportes(this.detalleFlete.empresa)
      .subscribe((transportes) => {
        this.transportes = transportes.filter(
          (transporte) => transporte.activo
        );
      });
    this.cargadoresServices
      .getCargadores(this.detalleFlete.empresa)
      .subscribe((cargadores) => {
        this.cargadores = cargadores;
      });
    this.transporteFlete.flete = this.precarga.id;

    //TransporteFlete
    console.log(this.fecha);
  }

  registrarFlete() {
    this.transporteFletesService
      .postTransportesFlete(this.transporteFlete)
      .subscribe((val) =>{});
    this.fletesServices
      .postFlete(this.detalleFlete)
      .subscribe((respuestaFlete) => {
        this.modalController.dismiss({ registrado: true })
      });

  }

  cerrar() {
    return this.modalController.dismiss();
  }
}