import { Component, OnInit } from '@angular/core';
import { Inmobiliaria } from '../interfaces/inmobiliaria'; 
import { Router } from '@angular/router';
import { InmobiliariaService } from '../services/inmobiliaria.service';
 
@Component({
  selector: 'app-inmobiliaria',
  templateUrl: './inmobiliaria.page.html',
  styleUrls: ['./inmobiliaria.page.scss'],
})
export class InmobiliariaPage implements OnInit {
  inmobiliarias: Inmobiliaria[] = [];

  constructor(
    private inmobiliariaService: InmobiliariaService, 
    private router: Router,
  ) { }

  ngOnInit() {
    this.consultarInmobiliarias()
  }

  private consultarInmobiliarias() {
    this.inmobiliariaService
      .getInmobiliarias()
      .subscribe((inmobiliarias) => {
        this.inmobiliarias = inmobiliarias;
      });
  }

  proyecto(inmobiliaria: string) {
    this.router.navigate(['/inmobiliaria', 'proyectos', inmobiliaria]); 
  }

  perfil(inmobiliaria: string){
    console.log(inmobiliaria)
    this.router.navigate(['/inmobiliaria', 'perfil', inmobiliaria]); 
  }
}
