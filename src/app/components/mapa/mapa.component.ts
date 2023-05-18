import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat: number = 0;
  long: number = 0;

  address: any;

  teachersPositions: [] = [];

  constructor(private countriesService: CountriesService) {
  }



  ngOnInit() {
    //Pedimos al navegador nuestra posiciòn a traves de geolocalización
    navigator.geolocation.getCurrentPosition( async position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;

      const address = await this.countriesService.getDireccion(this.lat, this.long)

      this.address = { "direccion": address.results[0].formatted_address }
      console.log(this.address)


      const teacher = await this.countriesService.getTeachersNearby(this.address)

      console.log(teacher)

      });
  }

}
