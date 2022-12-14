import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Precarga } from '../interfaces/precarga';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrecargaService {
  constructor(private httpClient: HttpClient) {}

  getPrecargas(correo: string): Observable<Precarga[]> {
    return this.httpClient.get<Precarga[]>(
      `${environment.api}/precargasCliente/${correo}`
    );
  }

  deletePrecarga(cliente: string, id: string, empresa:string): Observable<any> {
    return this.httpClient.delete(`${environment.api}/precarga/cliente`, {
      body: { cliente, id, empresa },
    });
  }

  postPrecarga(precarga: Precarga): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/precargaCliente`, precarga, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
