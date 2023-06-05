import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {


  logado: boolean = true;
  student: any = {}
  teachers: any = []
  currentId: number = 0


  constructor(
    private activateRoute: ActivatedRoute,
    private alumnoService: AlumnosService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.studentId;
      if(userId !== this.currentId.toString()) {
        localStorage.removeItem('token_login');
        localStorage.removeItem('user_role');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id')
        this.usuariosService.changeLogin(false);
        this.router.navigate(['/home']);
      }
      let response: any = await this.alumnoService.getByUserId(this.currentId);
      this.student = response;
    });
  }

}
