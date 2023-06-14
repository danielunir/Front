import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { RamasService } from 'src/app/services/ramas.service';
import { environment } from 'src/environments/environments';

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
  teacherName: string = '';
  remitenteId: string = '';
  destinatarioId: string = '';
  baseDownload: string = '';


  constructor(
    private ramasService: RamasService,
    private activateRoute: ActivatedRoute,
    private alumnoService: AlumnosService,
  ) { }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.teacherId;
      this.remitenteId = this.currentId.toString()
      this.teacherName = localStorage.getItem('username') || '';
      this.alumnos = await this.ramasService.getByUserId(this.currentId);

      this.baseDownload = environment.base_Download;
    });
  }

}
