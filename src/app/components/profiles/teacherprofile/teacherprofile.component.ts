
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {


  logado: boolean = true;
  teacher: any = {}
  currentId: number = 0;


  constructor(
    private teacherService: TeachersService,
    private activateRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.teacherId;
      let response: any = await this.teacherService.getByUserId(this.currentId);
      this.teacher = response;
    });
  }

}
