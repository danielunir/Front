import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public get(url:string){
    return this.http.get(url);
  }

  public post(url:string, body: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_login')!
      })
    }

    return this.http.put(url,body, httpOptions) // POST
  }
}
