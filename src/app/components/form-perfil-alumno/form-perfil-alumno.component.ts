import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-form-perfil-alumno',
  templateUrl: './form-perfil-alumno.component.html',
  styleUrls: ['./form-perfil-alumno.component.css']
})
export class FormPerfilAlumnoComponent {

  contador = 0;
  contadorMax = 255;

  formRegisterPerfilAlumno: FormGroup;

  @Input() usuarioId: number = 0;

  values: any;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ) {

    this.formRegisterPerfilAlumno = new FormGroup({
      estudia: new FormControl("",[
        Validators.required
      ]),
      status: new FormControl("",[])
    },[]);
  }

  checkControl(pControlName: string, pError: string): boolean {
    if(this.formRegisterPerfilAlumno.get(pControlName)?.hasError(pError) && this.formRegisterPerfilAlumno.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  onKey($event: any) {
    this.contador = $event.target.value.length;
    if(this.contador >= this.contadorMax) {
      $event.preventDefault();

    }
  }

  async getDataPerfilAlumno() {

    this.formRegisterPerfilAlumno.value.usuario_id = this.usuarioId;

    const { estudia, usuario_id } = this.formRegisterPerfilAlumno.value;

    this.values = { estudia, usuario_id }

    try {
      const response = await this.alumnosService.registroAlumno(this.values);

      console.log(response)
      if (!response.usuario_id) {
        return alert('Registro de datos de perfil erroneo')
      }

    } catch (error) {
      console.log(error)
    }
    this.router.navigate(['/studentprofile']);
  }
}
