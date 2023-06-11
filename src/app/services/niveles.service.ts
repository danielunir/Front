import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NivelesService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.base_Url}clase`;
  }

  registroNiveles(values: { nivel: string, usuario_id: number }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/nivel`, values, httpOptions)
    )
  }
}
