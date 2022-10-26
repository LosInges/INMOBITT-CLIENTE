import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private httpClient: HttpClient) {}

  postCliente(cliente: Cliente): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/cliente`, cliente);
  }

  getCliente(correo: string):Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${environment.api}/cliente/${correo}`);

  }

}
