import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Inmueble } from '../interfaces/inmueble';
import { InmuebleService } from '../services/inmueble.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-mis-inmuebles',
  templateUrl: './mis-inmuebles.page.html',
  styleUrls: ['./mis-inmuebles.page.scss'],
})
export class MisInmueblesPage implements OnInit {

  inmuebles: Inmueble[] = []
  api = environment.api
  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private inmuebleService: InmuebleService,
    private router: Router

  ) { }

  ngOnInit() {
    this.sessionService.get('correo').then((correo) => { 
      if (correo) {
        this.inmuebleService
          .getInmueblesCliente(correo)
          .subscribe((inmuebles) => {
            this.inmuebles = inmuebles; 
            console.log(inmuebles)
          });
      }
    });
  }

  navegar(inmueble: Inmueble){
    this.router.navigate(['./',inmueble.inmobiliaria,inmueble.proyecto, 'inmueble',inmueble.titulo],{
      relativeTo: this.activatedRoute
    })
  }

}
