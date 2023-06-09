import { Component } from '@angular/core';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-score',
  templateUrl: './teacher-score.component.html',
  styleUrls: ['./teacher-score.component.css']
})
export class TeacherScoreComponent {

  teachers_list: any;

  pageHome: boolean = true;

  loading: boolean;

  constructor(
    private puntuacionService: PuntuacionService
  ) {
      this.loading = true;
   }

  async ngOnInit() {
    this.teachers_list = [];

    this.bestScore();
  }

  async bestScore(): Promise<void> {
    try {
      const response = await this.puntuacionService.getBestScore();
      this.teachers_list = response;
      this.loading = false;
    }
    catch (error) {
      alert('No hay profesores disponibles en la BBDD');
    }
  }
}

