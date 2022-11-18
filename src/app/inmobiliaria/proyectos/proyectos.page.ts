import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {
  

  constructor(private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      console.log(params)
    })
  }

}
