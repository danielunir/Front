import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  disabled = true;
  contador = 0;
  contadorMax = 255;

  formRegister: FormGroup;

  constructor() {

    this.formRegister = new FormGroup({
      rol: new FormControl("",[]),
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

    },[
      this.checkPassword
    ])
  }

  continue($event: any) {

    $event.target.control.disabled = !this.disabled;

    setTimeout(() => {
      $event.target.control.disabled = true;
    }, 100);
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
    if(this.formRegister.get(pControlName)?.hasError(pError) && this.formRegister.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  getDataForm() {

  }

}
