import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string = '';

  role: string = '';

  @Input() logados: boolean = false;

  formLogin: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private teachersService: TeachersService,
    private alumnosService: AlumnosService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,

      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

  }

  async onSubmit() {
    try {
      const response = await this.usuariosService.login(this.formLogin.value);

      if (response.fatal) {
        return alert(response.fatal);
      }

      localStorage.setItem('token_login', response.token);
      this.usuariosService.changeLogin(true);

      const data = await this.profileService.getProfile();
      localStorage.setItem('user_id', data.id)

      this.role = data.role;
      this.logados = true;


      if (data.role === "alumno") {
        const personaldata = await this.alumnosService.getByUserId(data.id);

        if (!(personaldata.apellidos)) {
          return this.router.navigate(['/info-usuario']);
        }

        return this.router.navigate([`/studentprofile/${data.id}`]);
      }
      if (data.role === "profesor") {
        const personaldata = await this.teachersService.getByUserId(data.id);

        if (!(personaldata.apellidos)) {
          return this.router.navigate(['/info-usuario']);
        }

        return this.router.navigate([`/teacherprofile/${data.id}`]);
      }

      return this.router.navigate([`/adminprofile/${data.id}`]);

    } catch (error) {
      console.log(error);
    }
  }

  registro() {
    this.router.navigate(['/registro']);
  }

  cerrar() {
    this.router.navigate(['/home']);
  }

  limpiarFormulario() {
    this.formLogin.reset();
  }

  showPassword = false;

  toggleVisibility(input: any): void {
    if (input.type === 'password') {
      input.type = 'text';
      this.showPassword = true;
    } else {
      input.type = 'password';
      this.showPassword = false;
    }
  }



}
