import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { PuntuacionService } from 'src/app/services/puntuacion.service';

@Component({
  selector: 'app-teachers-of-alumno',
  templateUrl: './teachers-of-alumno.component.html',
  styleUrls: ['./teachers-of-alumno.component.css']
})
export class TeachersOfAlumnoComponent {

  formTeacherScore: FormGroup;
  logado: boolean = true;
  teachers: any = [];
  currentId: number = 0;
  studentName: string = '';
  remitenteId: string = '';
  destinatarioId: string = '';


  constructor(
    private alumnoService: AlumnosService,
    private activateRoute: ActivatedRoute,
    private puntuacionService: PuntuacionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    /* this.formTeacherScore = new FormGroup({
      score: new FormControl("", [Validators.required]),
      opinion_text: new FormControl("", [Validators.minLength(5)])
    }); */

    this.formTeacherScore = this.formBuilder.group({
      score: [5],
      opinion_text: ['']
    });

  }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = parseInt(params.studentId);
      this.remitenteId = this.currentId.toString();
      this.studentName = localStorage.getItem('username') || '';
      this.teachers = await this.alumnoService.getAllTeachers(this.currentId)
      console.log('this.teachers', this.teachers)
    });
  }

  async putTeacherScore(teacher: any, currentId: number) {
    try {
      const response: any = await this.puntuacionService.postScore({ profesor_id: teacher["id"], alumno_id: currentId, puntuacion: this.formTeacherScore.value.score, opinion: this.formTeacherScore.value.opinion_text });
      console.log(response);
      this.formTeacherScore.value.score = 5;
      this.formTeacherScore.value.opinion_text = "";
      // Reset form
      this.formTeacherScore.reset({ score: 5, opinion_text: '' });
      this.router.navigate(['/studentprofile', currentId, 'tables', 'profesores']);
    } catch (error) {
      console.error('Error en la puntuación del profesor: ', error);
    }
  }

  getColorClass(value: number): string {
    if (value < 5) {
      return 'color-red';
    } else if (value >= 5 && value < 7) {
      return 'color-blue';
    } else if (value >= 7 && value < 9) {
      return 'color-green';
    } else if (value >= 9 && value <= 10) {
      return 'color-excelent';
    } else {
      return 'color-default';
    }
  }


}


