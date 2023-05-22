import { Component, OnInit } from '@angular/core';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teachers-home-logado',
  templateUrl: './teachers-home-logado.component.html',
  styleUrls: ['./teachers-home-logado.component.css']
})
export class TeachersHomeLogadoComponent implements OnInit {

  teachersHome_list: any;

  totalPages: number = 0;
  arrPages: number[] = [];
  currentPage: number = 0;

  constructor(
    private teachersService: TeachersService,
    private puntuacionService: PuntuacionService
    ) {

    }

  ngOnInit() {
    this.teachersHome_list = [];

    this.teachersHome();
  }

  async teachersHome(pNum: number = 1): Promise<void> {
    try {
        let response = await this.teachersService.getTeachersHome(pNum);
        this.currentPage = response.page;
        this.totalPages = response.totalPages;
        this.teachersHome_list = response.results;
        if (this.arrPages.length !== this.totalPages) {
          this.arrPages = [];
          for (let i = 1; i <= this.totalPages; i++) {
            this.arrPages.push(i);
          }
        }
      }
      catch (error) {
      alert('No hay profesores disponibles en la BBDD');
    }
  }
}
