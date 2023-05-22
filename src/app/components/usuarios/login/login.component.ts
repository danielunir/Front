import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private teachersService: TeachersService,
    private alumnosService: AlumnosService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    const response = await this.usuariosService.login(this.formLogin.value);

    if (response.fatal) {
      return alert(response.fatal);
    }

    localStorage.setItem('token_login', response.token);
    this.usuariosService.changeLogin(true);

    const data = await this.profileService.getProfile();

    if (data.role === "alumno") {
      const personaldata = await this.alumnosService.getByUserId(data.id);

      if(!(personaldata.apellidos)) {
        return this.router.navigate(['/info-usuario']);
      }

      return this.router.navigate([`/studentprofile/:${data.id}`]);
    }
    if (data.role === "profesor") {
      const personaldata = await this.teachersService.getByUserId(data.id);

      if(!(personaldata.apellidos)) {
        return this.router.navigate(['/info-usuario']);
      }

      return this.router.navigate([`/teacherprofile/:${data.id}`]);
    }
    return this.router.navigate([`/adminprofile/:${data.id}`]);
  }

  registro() {
    this.router.navigate(['/registro']);
  }

  cerrar() {
    this.router.navigate(['/home']);
  }
}
