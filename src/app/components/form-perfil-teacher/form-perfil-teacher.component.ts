import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NivelesService } from 'src/app/services/niveles.service';
import { RamasService } from 'src/app/services/ramas.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-form-perfil-teacher',
  templateUrl: './form-perfil-teacher.component.html',
  styleUrls: ['./form-perfil-teacher.component.css']
})
export class FormPerfilTeacherComponent {

  contador = 0;
  contadorMax = 255;

  formRegisterPerfilTeacher: FormGroup;

  @Input() usuarioId: number = 0;

  values: any;
  valuesNivel: any;
  valuesArea: any;

  constructor(
    private teachersService: TeachersService,
    private ramasService: RamasService,
    private nivelesService: NivelesService,
    private router: Router
  ) {

    this.formRegisterPerfilTeacher = new FormGroup({
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
      ]),
      status: new FormControl("",[])
    },[])
  }

  checkControl(pControlName: string, pError: string): boolean {
    if(this.formRegisterPerfilTeacher.get(pControlName)?.hasError(pError) && this.formRegisterPerfilTeacher.get(pControlName)?.touched) {
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

  async getDataPerfilTeacher() {

    this.formRegisterPerfilTeacher.value.usuario_id = this.usuarioId;

    const { area_conocimiento, nivel, cuota, experiencia, usuario_id } = this.formRegisterPerfilTeacher.value;

    this.values = { cuota, experiencia, usuario_id }
    this.valuesArea = { materia: area_conocimiento, usuario_id }
    this.valuesNivel = { nivel, usuario_id }

    try {
      const response = await this.teachersService.registroProfesor(this.values);

      console.log(response);
      if (!response.usuario_id) {
        return alert('Registro de datos de perfil Profesor erroneo')
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const responseArea = await this.ramasService.registroRamas(this.valuesArea);

      console.log(responseArea)
      if (!responseArea.usuarioId) {
        return alert('Registro de datos de perfil Ramas erroneo')
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const responseNivel = await this.nivelesService.registroNiveles(this.valuesNivel);

      console.log(responseNivel)
      if (!responseNivel.usuarioId) {
        return alert('Registro de datos de perfil Niveles erroneo')
      }

    } catch (error) {
      console.log(error)
    }
    this.router.navigate(['/teacherprofile']);
  }
}
