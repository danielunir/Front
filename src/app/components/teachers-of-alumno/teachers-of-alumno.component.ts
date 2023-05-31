import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-teachers-of-alumno',
  templateUrl: './teachers-of-alumno.component.html',
  styleUrls: ['./teachers-of-alumno.component.css']
})
export class TeachersOfAlumnoComponent {

  logado: boolean = true;
  teachers: any = [];
  currentId: string = '';


  constructor(
    private alumnoService: AlumnosService,
    private activateRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.studentId;
      this.teachers = await this.alumnoService.getAllTeachers(this.currentId)
      console.log(this.teachers)
    });
  }

}


