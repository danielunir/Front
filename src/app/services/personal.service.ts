import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://teachers-groupb.herokuapp.com/api/personal';
  }

  registroPersonalProfesor(values: { nombre: string, apellidos: string, fecha_nacimiento: string, foto: string, direccion: string, ciudad: string, codigo_postal: string, telefono: string, usuario_id: number }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/teacher`, values, httpOptions)
    )
  }

  registroPersonalAlumno(values: { nombre: string, apellidos: string, fecha_nacimiento: string, foto: string, direccion: string, ciudad: string, codigo_postal: string, telefono: string, usuario_id: number }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/alumno`, values, httpOptions)
    )
  }
}
