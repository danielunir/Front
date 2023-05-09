import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'https://teachers-groupb.herokuapp.com/api/teachers';
  }

  getAll() {
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    )
  }

  registroProfesor(values: { cuota: number, experiencia: string, usuario_id: string }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/`, values)
    )
  }
}
