import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
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
      return this.router.navigate(['/studentprofile']);
    }
    if (data.role === "profesor") {
      return this.router.navigate(['/teacherprofile']);
    }
    return this.router.navigate(['/adminprofile']);
  }

  registro() {
    this.router.navigate(['/registro']);
  }

  cerrar() {
    this.router.navigate(['/home']);
  }
}
