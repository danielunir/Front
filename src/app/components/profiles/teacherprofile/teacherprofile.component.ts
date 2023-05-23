import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {
  teacher: any;

  constructor(
    private teacherService: TeachersService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.teacherId;
      let response: any = await this.teacherService.getByUserId(currentId);
      this.teacher = response;
      console.log(this.teacher);
    });
  }
}
