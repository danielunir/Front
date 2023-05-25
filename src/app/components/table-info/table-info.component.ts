import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit {
  logado: boolean = true;
  admin: any = {}
  studentList: [] = [];
  teacherList: [] = [];
  profType: string = '';

  constructor(
    private studentsService: AlumnosService,
    private teachersService: TeachersService,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.adminId;
      this.profType = params.tableType;
      let response: any = await this.adminService.getByUserId(currentId);
      this.admin = response;
    });

    const studentsResponse = await this.studentsService.getAllStudents();
    const teacherResponse = await this.teachersService.getAll();
    this.studentList = studentsResponse.results;
    this.teacherList = teacherResponse.results;
    console.log(this.studentList);
    console.log(this.teacherList);
  }
}
