import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { ModalController } from '@ionic/angular';
import { Inmobiliaria } from 'src/app/interfaces/inmobiliaria'; 
import { MapsComponent } from 'src/app/maps/maps.component';
import { EstadosService } from 'src/app/services/estados.service';
import { InmobiliariaService } from 'src/app/services/inmobiliaria.service'; 
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';
 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {  
  notario: string = this.activatedRoute.snapshot.paramMap.get('notario');
  api = environment.api; 
  estados = this.estadosService.getEstados();
  listaVisible = 'Agentes';
  inmobiliariaC:string;

  inmobiliaria: Inmobiliaria = {
    correo: '',
    password: '',
    nombre: '',
    foto: '',
    estado: '',
    direccion: {
      lat: 0,
      lng: 0
    },
    sedes: [],
  };

  constructor(
    private inmobiliariaService: InmobiliariaService,
    private sessionService: SessionService,
    private estadosService: EstadosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.sessionService);
    this.activatedRoute.params.subscribe((params) => { 
      if (params.inmobiliaria) {
        this.inmobiliariaService
          .getInmobiliaria(params.inmobiliaria)
          .subscribe((inmobiliaria) => {
            this.inmobiliaria = inmobiliaria; 
            console.log(inmobiliaria)
          });
      }
    });
  }

  async verDireccion() {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position: this.inmobiliaria.direccion },
      cssClass: 'modalGeneral',
    });

    modal.present();
  }

}
