import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/cliente';
import { Empresa } from 'src/app/interfaces/empresa';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstadosService } from 'src/app/services/estados.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
  };
  confirmPassword = '';

  constructor(private modalController: ModalController,
    private clienteService: ClienteService
    ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.cliente.password === this.confirmPassword) {
      if(this.cliente.apellido.trim().length>0 &&
        (this.cliente.correo.match("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"))&&
        this.cliente.nombre.trim().length>0 &&
        this.cliente.password.trim().length >0 )

        this.clienteService.postCliente(this.cliente).subscribe((respuesta)=>{
          console.log(respuesta);
        })


    }
    else console.log("no son iguales")
  }
  cerrar() {
    this.modalController.dismiss();
  }
}
