import { Component } from '@angular/core';
import { RamasService } from 'src/app/services/ramas.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent {

  logados: boolean = true;
  data: any = {}
  alumnos: any = []

  constructor(
    private teachersService: TeachersService,
    private ramasService: RamasService
  ) {
  }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.data = await this.teachersService.getByUserId(userId);
    const teacherId = this.data.id
    console.log(teacherId)
    this.alumnos = await this.ramasService.getByUserId(userId);
    console.log(this.alumnos)

  }
}
