import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalService } from 'src/app/services/personal.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { RamasService } from 'src/app/services/ramas.service';
import { NivelesService } from 'src/app/services/niveles.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @ViewChild("t1")t1!: ElementRef;
  @ViewChild("t2")t2!: ElementRef;
  @ViewChild("t3")t3!: ElementRef;

  contador = 0;
  contadorMax = 255;

  formRegisterUsuario: FormGroup;
  formRegisterPersonal: FormGroup;
  formRegisterPerfil: FormGroup;

  rolUser: string;

  insertId: number = 0;
  insertIdProfesor: number = 0;

  values: any;
  valuesNivel: any;
  valuesArea: any;

  constructor(
    private renderer2: Renderer2,
    private usuariosService: UsuariosService,
    private personalService: PersonalService,
    private teachersService: TeachersService,
    private alumnosService: AlumnosService,
    private ramasService: RamasService,
    private nivelesService: NivelesService,
    private router: Router
    ) {

    this.formRegisterUsuario = new FormGroup({
      role: new FormControl("",[
        Validators.required
      ]),
      username: new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("",[
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.pattern(/^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/)
      ]),
      confirmPassword: new FormControl("",[
        Validators.required
      ]),
      acepta: new FormControl("",[
        Validators.required
      ])
    },[
      this.checkPassword
    ]);


    this.formRegisterPersonal = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(45)
      ]),
      apellidos: new FormControl("", [
        Validators.required,
        Validators.maxLength(45)
      ]),
      direccion: new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ]),
      ciudad: new FormControl("",[
        Validators.required,
        Validators.maxLength(45)
      ]),
      codigo_postal: new FormControl("",[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]),
      telefono: new FormControl("",[
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12)
      ]),
      fecha_nacimiento: new FormControl("",[])
    },[]);

    this.rolUser = this.formRegisterUsuario.value.role;

    console.log(this.rolUser);

    (this.rolUser === 'profesor') ?

    this.formRegisterPerfil = new FormGroup({
      area_conocimiento: new FormControl("",[
        Validators.required
      ]),
      nivel: new FormControl("",[
        Validators.required
      ]),
      cuota: new FormControl("",[
        Validators.required
      ]),
      experiencia: new FormControl("",[
        Validators.required
      ])
    },[])

    :

    this.formRegisterPerfil = new FormGroup({
      estudia: new FormControl("",[
        Validators.required
      ])
    },[]);

  }

  disable() {
    this.renderer2.setAttribute(this.t2.nativeElement, 'disabled', 'true');
    this.renderer2.removeAttribute(this.t2.nativeElement, 'checked');
  }

  enable() {
    this.renderer2.removeAttribute(this.t2.nativeElement, "disabled");
    this.renderer2.setAttribute(this.t2.nativeElement, 'checked', 'true');
    this.renderer2.removeAttribute(this.t1.nativeElement, 'checked');
  }

  enablet3() {
    this.renderer2.removeAttribute(this.t3.nativeElement, "disabled");
    this.renderer2.setAttribute(this.t3.nativeElement, 'checked', 'true');
  }

  continue($event: any) {
    if($event.target.attributes.for.value === 't2') {
      this.enable();
    } else if($event.target.attributes.for.value === 't3') {

      this.disable();
      this.enablet3();
    }
  }

  onKey($event: any) {
    this.contador = $event.target.value.length;
    if(this.contador >= this.contadorMax) {
      $event.preventDefault();

    }
  }

  checkPassword(pFormValue: AbstractControl) {

    const password: string = pFormValue.get('password')?.value;
    const confirmPassword: string = pFormValue.get('confirmPassword')?.value;

    if(password !== confirmPassword) {
      return { 'checkpassword': true }
    }
    return null;
  }

  checkControl(pControlName: string, pError: string): boolean {
    if(this.formRegisterUsuario.get(pControlName)?.hasError(pError) && this.formRegisterUsuario.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  async getDataUsuario() {

    try {
      const response = await this.usuariosService.registroUsuario(this.formRegisterUsuario.value);

      this.insertId = response.insertId;

      if (!response.insertId) {
        return alert('Registro de usuario erroneo');
      }
    } catch (error) {
      console.log(error);
    }

  }

  async getDataPersonal() {

    this.formRegisterPersonal.value.usuario_id = this.insertId;

    try {
      const response = await this.personalService.registroPersonal(this.formRegisterPersonal.value);

      if (!response.insertId) {
        return alert('Registro  de datos personales erroneo')
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getDataPerfil() {

    this.formRegisterPerfil.value.usuario_id = this.insertId;

    if (this.rolUser === 'profesor') {

      const { area_conocimiento, nivel, cuota, experiencia, usuario_id } = this.formRegisterPerfil.value;

      this.values = { cuota, experiencia, usuario_id }
      this.valuesArea = { materia: area_conocimiento, usuario_id }
      this.valuesNivel = { nivel, usuario_id }

      try {
        const response = await this.teachersService.registroProfesor(this.values);

        if (!response.insertId) {
          return alert('Registro de datos de perfil erroneo')
        }
      } catch (error) {
        console.log(error)
      }

      try {
        const responseArea = await this.ramasService.registroRamas(this.valuesArea);

        if (!responseArea.insertId) {
          return alert('Registro de datos de perfil erroneo')
        }
      } catch (error) {
        console.log(error)
      }

      try {
        const responseNivel = await this.nivelesService.registroNiveles(this.valuesNivel);

        if (!responseNivel.insertId) {
          return alert('Registro de datos de perfil erroneo')
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (this.rolUser === 'alumno') {

      const { estudia, usuario_id } = this.formRegisterPerfil.value;

      this.values = { estudia, usuario_id }

      try {
        const response = await this.alumnosService.registroAlumno(this.values);

        if (!response.insertId) {
          return alert('Registro de datos de perfil erroneo')
        }
      } catch (error) {

      }
    }

  }

}
