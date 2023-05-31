import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { RamasService } from 'src/app/services/ramas.service';

@Component({
  selector: 'app-alumnos-of-teacher',
  templateUrl: './alumnos-of-teacher.component.html',
  styleUrls: ['./alumnos-of-teacher.component.css']
})
export class AlumnosOfTeacherComponent {

  logado: boolean = true;
  alumnos: any = [];
  alumnoData: any = [];
  currentId: string = '';


  constructor(
    private ramasService: RamasService,
    private activateRoute: ActivatedRoute,
    private alumnoService: AlumnosService,
  ) { }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.teacherId
      console.log(this.currentId);
      this.alumnos = await this.ramasService.getByUserId(this.currentId);
      console.log(this.alumnos);
    });
  }

}
