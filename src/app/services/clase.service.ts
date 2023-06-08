import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://teachers-groupb.herokuapp.com/api/clase';
   }

   registroClase( values: { profesor_id: number, alumno_id: number, rama_co_id: number }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}`,values, httpOptions)
    )
   }
}
