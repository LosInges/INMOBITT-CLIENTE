import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { ClienteService } from '../services/cliente.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  cliente: Cliente = {
     correo :'',
     nombre:'',
     password:'',
     apellido:''
    };

  constructor(
    private clienteService: ClienteService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.sessionService.get('correo')?.then((correo) => {
      this.clienteService
        .getCliente(correo)
        .subscribe((cliente) => (this.cliente = cliente));
    });
  }
}
