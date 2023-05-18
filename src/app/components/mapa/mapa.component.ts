import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  geolocal: boolean = false;

  lat: number = 40.42018;
  long: number = -3.68873;

  address: any;

  teachersPositions: Teacher[] = [];

  constructor(private countriesService: CountriesService) {
  }



  ngOnInit() {
    //Pedimos al navegador nuestra posiciòn a traves de geolocalización
    navigator.geolocation.getCurrentPosition( async position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;

      if (this.lat === 40.42018 && this.long === -3.68873) {
        this.geolocal = false;

      } else {
        this.geolocal = true;
        const address = await this.countriesService.getDireccion(this.lat, this.long)

        this.address = { "direccion": address.results[0].formatted_address }

      }

        const teacher = await this.countriesService.getTeachersNearby(this.address)

        this.teachersPositions = teacher;

        this.teachersPositions[2]?.latitud

    });
  }

}
