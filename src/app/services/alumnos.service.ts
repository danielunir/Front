import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = '';
  }

  registroAlumno(values: { estudia: string, usuario_id: string }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/`, values)
    )
  }


}
