import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private adminService: AdminService
  ) { }

  async ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.adminId;
      this.profType = params.tableType;

      try {
        let response: any = await this.adminService.getByUserId(currentId);
        this.admin = response;

        if (this.profType === 'alumnos') {
          const studentsResponse = await this.studentsService.getAllStudents();
          this.studentList = studentsResponse.results;
        } else if (this.profType === 'profesores') {
          const teacherResponse = await this.teachersService.getAll();
          this.teacherList = teacherResponse.results;
        }

        this.dataLoaded = true;
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
