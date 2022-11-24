import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inmobiliaria } from '../interfaces/inmobiliaria';

@Injectable({
  providedIn: 'root',
})
export class InmobiliariaService {
  constructor(private httpClient: HttpClient) {}  
  getInmobiliaria(correo: string): Observable<Inmobiliaria> {
    return this.httpClient.get<Inmobiliaria>(
      `${environment.api}/inmobiliaria/${correo}`
    );
  } 

  getInmobiliarias(): Observable<Inmobiliaria[]> {
    return this.httpClient.get<Inmobiliaria[]>(
      `${environment.api}/inmobiliarias`
    );
  } 
}
