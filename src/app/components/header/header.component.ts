import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  role: string = '';
  currentRoute: string = '';
  userId: string = '';


  @Input() logado: boolean = false;

  formLogin: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private teachersService: TeachersService,
    private alumnosService: AlumnosService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.checkToken();
    this.checkUserRole();
    this.checkUsername();
    this.route.url.subscribe(url => {
      this.currentRoute = url[0].path;
    });
  }
  checkToken() {
    const token = localStorage.getItem('token_login');
    this.logado = !!token;
    if (this.logado) {
      const userId = localStorage.getItem('user_id');
      this.userId = userId ? userId : '';
    }
  }

  checkUserRole() {
    const role = localStorage.getItem('user_role');
    this.role = role ? role : '';
  }

  checkUsername() {
    const username = localStorage.getItem('username');
    this.username = username ? username : '';
  }

  navigateToProfile() {
    if (this.role === 'alumno') {
      this.router.navigate(['/studentprofile', this.userId]);
    } else if (this.role === 'profesor') {
      this.router.navigate(['/teacherprofile', this.userId]);
    } else if (this.role === 'admin') {
      this.router.navigate(['/adminprofile', this.userId]);
    }
  }


  logOut() {
    localStorage.removeItem('token_login');
    localStorage.removeItem('user_role');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id')
    this.usuariosService.changeLogin(false);
    this.checkToken();
    this.checkUserRole();
    this.checkUsername();
    this.router.navigate(['/home']);
  }



  async onSubmit() {
    try {
      const response = await this.usuariosService.login(this.formLogin.value);

      if (response.fatal) {
        this.formLogin.reset();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo fue mal, vuelve a intentarlo',
        })
        return response.fatal;

      }


      localStorage.setItem('token_login', response.token);
      this.usuariosService.changeLogin(true);
      this.checkToken();

      const data = await this.profileService.getProfile();
      localStorage.setItem('user_id', data.id)
      localStorage.setItem('user_role', data.role); // almacena el rol en el almacenamiento local
      localStorage.setItem('username', data.username); // almacena el username en localStorage
      this.logado = true;
      this.username = data.username;
      this.userId = data.id;


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

  isInfoUsuarioRoute() {
    return this.currentRoute === 'info-usuario';
  }




}
