import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit, OnDestroy {
  logado: boolean = true;
  admin: any = {}
  studentList: [] = [];
  teacherList: [] = [];
  profType: string = '';
  dataLoaded: boolean = false;
  private subscription: Subscription | null = null;

  constructor(
    private studentsService: AlumnosService,
    private teachersService: TeachersService,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.adminId;
      this.profType = params.tableType;

      try {
        let response: any = await this.adminService.getByUserId(currentId);
        this.admin = response;
        console.log(this.admin)

        if (this.profType === 'alumnos') {
          const studentsResponse = await this.studentsService.getAllStudents();
          this.studentList = studentsResponse.results;
          console.log(this.studentList);
        } else if (this.profType === 'profesores') {
          const teacherResponse = await this.teachersService.getTeachersAdmin();
          this.teacherList = teacherResponse.results;
          console.log(this.teacherList);
        }

        this.dataLoaded = true;
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    });
  }

  async validateTeacher(teacherId: number) {
    try {
      const response: any = await this.teachersService.setActive(teacherId, { status: 1 });
      console.log(response);
      this.router.navigate(['/adminprofile', this.admin.usuario_id
        , 'tables', 'profesores']);
    } catch (error) {
      console.error('Error en la validación del profesor: ', error);
    }
  }

  async deleteTeacher(teacherId: number) {
    try {
      const response: any = await this.teachersService.setInactive(teacherId, { status: 0 });
      console.log(response);
      this.router.navigate(['/adminprofile', this.admin.usuario_id, 'tables', 'profesores']);
    } catch (error) {
      console.error('Error en el borrado del profesor: ', error);
    }
  }

  async deleteStudent(studentId: number) {
    try {
      const response: any = await this.studentsService.setInactive(studentId, { status: 0 });
      console.log(response);
      this.router.navigate(['/adminprofile', this.admin.usuario_id, 'tables', 'alumnos']);
    } catch (error) {
      console.error('Error en el borrado del alumno: ', error);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
