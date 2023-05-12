import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from 'src/app/services/personal.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.css']
})
export class FormPersonalComponent {

  formRegisterPersonal: FormGroup;;

  @Input() disable: any;
  @Input() enable: any;
  @Input() enablet3: any;

  @Output() continuar = new EventEmitter()

  userId:number = 0;

  role: string = '';

  @Output() rol = new EventEmitter();

  constructor(
    private personalService: PersonalService,
    private profileService: ProfileService
  ) {

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
      fecha_nacimiento: new FormControl("",[]),
      foto: new FormControl("",[])
    },[]);
  }

  onContinuar($event: any) {
    this.continuar.emit($event)
  }

  checkControl(pControlName: string, pError: string): boolean {
    if(this.formRegisterPersonal.get(pControlName)?.hasError(pError) && this.formRegisterPersonal.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  async datarecovery(){
    const data = await this.profileService.getProfile();

    this.userId = data.id;
    console.log(this.userId);
    this.role = data.role;
    this.rol.emit(this.role);
  }

  async getDataPersonal() {

    const data = await this.profileService.getProfile();

    this.userId = data.id;
    this.role = data.role;

    console.log(this.role);



    this.formRegisterPersonal.value.usuario_id = this.userId;

    console.log(this.formRegisterPersonal.value)

    if (this.role === 'profesor') {
      try {
        const response = await this.personalService.registroPersonalProfesor(this.formRegisterPersonal.value);
        console.log(response);

        if (!response.usuario_id) {
          return alert('Registro  de datos personales erroneo')
        }
      } catch (error) {
        console.log(error);
      }

    }

    if (this.role === 'alumno') {
      try {
        const response = await this.personalService.registroPersonalAlumno(this.formRegisterPersonal.value);

        if (!response.usuario_id) {
          return alert('Registro  de datos personales erroneo')
        }
      } catch (error) {
        console.log(error);
      }

    }
  }
}
