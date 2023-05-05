import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent {
  constructor(
    private teachersService: TeachersService
  ) { }

  async ngOnInit() {
    const response = await this.teachersService.getAll();
    console.log(response);
  }
}
