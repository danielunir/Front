import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = '';
  }

  registroPerfilProfesor(values: {  }) {

  }
}
