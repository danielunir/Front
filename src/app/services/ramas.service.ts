import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RamasService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = '';
  }

  registroRamas(values: { materia: string, usuario_id: number }){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/`, values)
    )
  }
}
