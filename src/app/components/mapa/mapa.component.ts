import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { CountriesService } from 'src/app/services/countries.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { environment } from 'src/environments/environments';

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

  @Input() search!: boolean;

  teachers_list: any;

  totalPages: number = 0;
  arrPages: number[] = [];
  currentPage: number = 0;

  baseDownload: string = '';

  constructor(
    private countriesService: CountriesService,
    private teachersService: TeachersService
    ) {
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

        try {
          const address = await this.countriesService.getDireccion(this.lat, this.long)

          this.address = { "direccion": address.results[0].formatted_address }
        } catch (error) {
          console.log(error);
        }
      }

      if(!this.search) {
        try {
          const teacher = await this.countriesService.getTeachersNearby(this.address)

          this.teachersPositions = teacher;

          this.teachersPositions[2]?.latitud
        } catch (error) {
          console.log(error);
        }
      } else {
        this.teachers()
      }
    });

    this.teachers_list = [];

    this.baseDownload = environment.base_Download;
  }

  async teachers(pNum: number = 1): Promise<void> {
    try {
      let result: any = await this.teachersService.getTeachersHome(pNum);
      this.currentPage = result.page;
        this.totalPages = result.totalPages;
        this.teachers_list = result.results;

        this.teachersPositions = result.results;

        for(let i = 0; i < this.teachersPositions.length; i++) {
          this.teachersPositions[i].latitud

        }

        if (this.arrPages.length !== this.totalPages) {
          this.arrPages = [];
          for (let i = 1; i <= this.totalPages; i++) {
            this.arrPages.push(i);
          }
        }
    } catch (error) {
      console.log(error);
    }
  }

}
