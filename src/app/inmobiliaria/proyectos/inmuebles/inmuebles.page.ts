import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Inmueble } from 'src/app/interfaces/inmueble';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.page.html',
  styleUrls: ['./inmuebles.page.scss'],
})
export class InmueblesPage implements OnInit {
  inmuebles: Inmueble[] = []
  api = environment.api
  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private inmuebleService: InmuebleService,
    private router: Router

  ) { }

  ngOnInit() {
    console.log(this.sessionService);
    this.activatedRoute.params.subscribe((params) => { 
      if (params.inmobiliaria && params.proyecto) {
        this.inmuebleService
          .getInmueblesProyecto(params.proyecto, params.inmobiliaria)
          .subscribe((inmuebles) => {
            this.inmuebles = inmuebles; 
            console.log(inmuebles)
          });
      }
    });
  }

  navegar(inmueble: Inmueble){
    this.router.navigate(['./','inmueble',inmueble.titulo],{
      relativeTo: this.activatedRoute
    })
  }

}
