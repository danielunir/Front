import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAll(pPage: number = 1): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${pPage}`, httpOptions));
  }

  getTeachersHome(pPage: number = 1): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/active?page=${pPage}`, httpOptions));

  }

  registroProfesor(values: { cuota: number, experiencia: string, status: number, usuario_id: string }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/`, values, httpOptions)
    )
  }

  getByUserId(userId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/user/${userId}`, httpOptions)
    )
  }

}
