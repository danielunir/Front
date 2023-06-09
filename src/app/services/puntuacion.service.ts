import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${environment.base_Url}puntuacion`;
  }

  getBestScore(): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  postScore(values: { profesor_id: number, alumno_id: number, puntuacion: number, opinion: string }): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}`, values, httpOptions));
  }
}

