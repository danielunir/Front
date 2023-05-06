import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  teachers_list: any;
  constructor(
    private teachersService: TeachersService
  ) { }

  async ngOnInit() {
    try {
      const response = await this.teachersService.getAll();
      const teachers = response.results;
      this.teachers_list = teachers;
    } catch (error) {
      alert('No hay profesores disponibles en la BBDD');
    }
  }
}
