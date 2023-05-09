import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = '';
  }

  registroPersonal(values: { nombre: string, apellidos: string, direccion: string, ciudad: string, codigo_postal: string, telefono: string, fecha_nacimiento: string, usuario_id: number }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/`, values)
    )
  }
}
