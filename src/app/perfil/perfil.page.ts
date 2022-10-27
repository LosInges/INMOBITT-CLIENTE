import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    correo: '',
    nombre: '',
    password: '',
    apellido: '',
  };
  confirmPassword = '';
  constructor(
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sessionService.get('correo')?.then((correo) => {
      if (correo)
        this.clienteService
          .getCliente(correo)
          .subscribe((cliente) => (this.cliente = cliente));
    });
  }

  actualizarCliente() {
    if (this.cliente.password === this.confirmPassword) {
      if (
        this.cliente.apellido.trim().length > 0 &&
        this.cliente.nombre.trim().length > 0 &&
        this.cliente.password.trim().length > 0
      )
        this.clienteService.postCliente(this.cliente)?.subscribe((val) => {
          console.log(val);
        });
    }
  }

  eliminarCuenta() {
    if (this.cliente.password === this.confirmPassword)
      this.clienteService
        .deleteCliente(this.cliente.correo)
        ?.subscribe((val) => {
          if (val.results)
            this.sessionService.clear().then(() => this.router.navigate([""]));
        });
  }
}
