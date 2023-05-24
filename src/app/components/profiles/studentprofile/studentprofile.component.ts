import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';


@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  logados: boolean = true;
  student: any = {}

  constructor(
    private activateRoute: ActivatedRoute,
    private alumnoService: AlumnosService,
  ) {
  }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.studentId;
      let response: any = await this.alumnoService.getByUserId(currentId);
      this.student = response;
    });
  }

}
