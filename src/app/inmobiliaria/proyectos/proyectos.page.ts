import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {
  proyectos: Proyecto[]=[];


  constructor(
    private activedRoute:ActivatedRoute,
    private proyectosService: ProyectosService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    console.log(this.sessionService);
    this.activatedRoute.params.subscribe((params) => { 
      if (params.inmobiliaria) {
        this.proyectosService
          .getProyectosInmobiliaria(params.inmobiliaria)
          .subscribe((proyectos) => {
            this.proyectos = proyectos; 
            console.log(proyectos)
          });
      }
    });
  }
  navegar(proyecto: Proyecto){
    this.router.navigate(['./',proyecto.nombre,'inmuebles'],{
      relativeTo: this.activatedRoute
    })
  }

}
