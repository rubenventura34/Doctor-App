import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpService) { }

  getPaciente(token): Observable<any>{
  	return this.http.post('getPaciente', token);
  }
  enviarReporte(data): Observable<any>{
  	return this.http.post('reporteMedico', data);
  } 
}
