import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent {

  logados: boolean = true;
  data: any = {}

  constructor(
    private teachersService: TeachersService,
  ) {
  }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.data = await this.teachersService.getByUserId(userId);
  }
}
