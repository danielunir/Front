import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent {

  formRegisterUsuario: FormGroup;

  rolUser: string;

  insertId: number = 0;

  @Input() disable: any;
  @Input() enable: any;
  @Input() enablet3: any;

  @Output() continuar = new EventEmitter()

  @Output() insertarId = new EventEmitter()
  @Output() determinarRol = new EventEmitter()

  constructor(
    private usuariosService: UsuariosService,
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

    this.rolUser = this.formRegisterUsuario.value.role;
  }

  onContinuar($event: any) {
    this.continuar.emit($event)
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
      this.insertarId.emit(this.insertId);
      this.rolUser = this.formRegisterUsuario.value.role;
      this.determinarRol.emit(this.rolUser)

      this.router.navigate(['/login']);

      if (!response.insertId) {
        alert(response.fatal);
        return alert('Registro de usuario erroneo');
      }
    } catch (error) {
      console.log(error);
    }

  }

}
