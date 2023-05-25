
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RamasService } from 'src/app/services/ramas.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {


  logado: boolean = true;
  teacher: any = {}
  alumnos: any = []


  constructor(
    private teacherService: TeachersService,
    private activateRoute: ActivatedRoute,
    private ramasService: RamasService
  ) { }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.teacherId;
      let response: any = await this.teacherService.getByUserId(currentId);
      this.teacher = response;
      this.alumnos = await this.ramasService.getByUserId(currentId)
    });
  }

}
