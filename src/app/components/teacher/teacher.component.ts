import { Component } from '@angular/core';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  teachers_list: any;
  totalPages: number = 0;
  arrPages: number[] = [];
  currentPage: number = 0;

  pageHome: boolean = true;
  constructor(
    private teachersService: TeachersService,
    private puntuacionService: PuntuacionService
  ) { }

  async ngOnInit() {
    this.teachers_list = [];

    (!this.pageHome) ? this.gotoPage() : this.bestScore();
  }
  async gotoPage(pNum: number = 1): Promise<void> {
    try {
      let response = await this.teachersService.getAll(pNum);
      this.currentPage = response.page;
      this.totalPages = response.totalPages;
      this.teachers_list = response.results;
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

  async bestScore(): Promise<void> {
    try {
      const response = await this.puntuacionService.getBestScore();
      console.log(response);
      this.teachers_list = response;
      }
      catch (error) {
      alert('No hay profesores disponibles en la BBDD');
    }
  }
}
