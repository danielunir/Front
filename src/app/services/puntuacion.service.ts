import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'https://teachers-groupb.herokuapp.com/api/puntuacion';
   }

   getBestScore(): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }
}

