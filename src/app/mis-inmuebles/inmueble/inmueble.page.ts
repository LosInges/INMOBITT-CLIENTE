import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agente } from 'src/app/interfaces/agente';
import { Inmueble } from 'src/app/interfaces/inmueble';
import { Notario } from 'src/app/interfaces/notario';
import { AgenteService } from 'src/app/services/agente.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { NotarioService } from 'src/app/services/notario.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.page.html',
  styleUrls: ['./inmueble.page.scss'],
})
export class InmueblePage implements OnInit {
  api = environment.api;
  inmueble: Inmueble={
    inmobiliaria: '',
    proyecto: '',
    titulo: '',
    estado: '',
    foto: '',
    direccion: {
      lat: 0,
      lng: 0
    },
    precio_renta: 0,
    precio_venta: 0,
    cuartos: 0,
    pisos: 0,
    metros_cuadrados: 0,
    descripcion: '',
    servicios: [''],
    notario: '',
    agente: '',
    visible: true,
    borrado: true,
    cliente: '',
  };
  agente: Agente={
    apellido: '',
    correo: '',
    foto: '',
    inmobiliaria: '',
    nombre: '',
    password: '',
    rfc: '',
    telefono: ''
  };
  notario: Notario ={
    apellido: '',
    correo: '',
    foto: '',
    inmobiliaria: '',
    nombre: '',
    rfc: ''
  }
  constructor(
    private sessionService: SessionService,
    private inmuebleService: InmuebleService,
    private activatedRoute: ActivatedRoute,
    private agenteService: AgenteService,
    private notarioService: NotarioService

  ) { }

  ngOnInit() {
    this.sessionService.get('correo').then(correo =>{
      this.inmueble.cliente=correo
    })
    this.activatedRoute.params.subscribe((params) => { 
      if (params.titulo) {
        this.inmuebleService
          .getInmueble(params.inmobiliaria, params.proyecto, params.titulo)
          .subscribe((inmueble) => {
            this.inmueble = inmueble; 
            this.agenteService.getAgente(inmueble.inmobiliaria, inmueble.agente).subscribe(agente =>{
              this.agente = agente
            });
            this.notarioService.getNotario(inmueble.inmobiliaria, inmueble.notario).subscribe(notario =>{
              this.notario = notario
            })
          });
      }
    });
    
  }

  quitar(){
    this.inmuebleService.deleteInmuebleCliente(this.inmueble).subscribe(val =>{
      if(val.results){
        console.log('se quitó')
      }else{
        console.log(val)
      }
    })
  }

}
