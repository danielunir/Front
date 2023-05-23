import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';


@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  logados: boolean = true;
  data: any = {}

  constructor(
    private alumnosService: AlumnosService,
  ) {
  }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id');
    this.data = await this.alumnosService.getByUserId(userId);
  }

}
