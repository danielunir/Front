import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RamasService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://teachers-groupb.herokuapp.com/api/clase';
  }

  registroRamasCo(values: { usuario_id: number, materia_id: number, nivel_id: number }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/ramaco`, values, httpOptions)
    )
  }

  getByUserId(userId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${userId}`, httpOptions)
    )
  }
}
