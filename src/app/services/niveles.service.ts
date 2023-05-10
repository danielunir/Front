import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelesService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = '';
  }

  registroNiveles(values: { nivel: string, usuario_id: number }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/`, values)
    )
  }
}
