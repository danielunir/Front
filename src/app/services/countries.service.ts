import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  baseUrl: string = "https://teachers-groupb.herokuapp.com/api/teachers/map";

  baseUrlInversGeo: string = "https://maps.googleapis.com/maps/api/geocode/json?latlng="

  constructor(private httpClient: HttpClient) { }

  getDireccion(lat: number, lng: number): Promise<any> {

    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrlInversGeo}${lat},${lng}&result_type=street_address&key=${environment.googleMaps.apiKey}`));
  }

  getTeachersNearby(value: any): Promise<any> {
    console.log(value)

    console.log(this.httpClient.post<any>(`${this.baseUrl}`, value))

    console.log(firstValueFrom( this.httpClient.post<any>(`${this.baseUrl}`, value)))

    return firstValueFrom( this.httpClient.post<any>(`${this.baseUrl}`, value))

  }

}
