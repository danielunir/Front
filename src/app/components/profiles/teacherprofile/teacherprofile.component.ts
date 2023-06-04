
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.teacherId;
      if(userId !== this.currentId.toString()) {
        localStorage.removeItem('token_login');
        localStorage.removeItem('user_role');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id')
        this.usuariosService.changeLogin(false);
        this.router.navigate(['/home']);
      }
      let response: any = await this.teacherService.getByUserId(this.currentId);
      this.teacher = response;
      console.log(this.teacher)
    });
  }

}
