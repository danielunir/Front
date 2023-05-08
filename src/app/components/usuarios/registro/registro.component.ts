import { Component, ElementRef, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @ViewChild("t1")t1!: ElementRef;
  @ViewChild("t2")t2!: ElementRef;
  @ViewChild("t3")t3!: ElementRef;
  @ViewChild("fieldset")fieldset!: ElementRef;

  contador = 0;
  contadorMax = 255;

  formRegisterUsuario: FormGroup;
  formRegisterRol: FormGroup;

  rolUser: string;
  nombre: string;
  apellidos: string;
  direccion: string;
  ciudad: string;
  codigo_postal: number;
  telefono: string;


  constructor(private renderer2: Renderer2) {

    this.formRegisterUsuario = new FormGroup({
      rol: new FormControl("",[
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
    ])

    this.rolUser = this.formRegisterUsuario.value.rol;

    // console.log(this.rolUser);

    (this.rolUser === 'alumno') ?

    this.formRegisterRol = new FormGroup({
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
      estudia: new FormControl("",[
        Validators.required
      ]),
    },[]) :

    this.formRegisterRol = new FormGroup({
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

    console.log(this.formRegisterRol);
    this.nombre = this.formRegisterRol.value.nombre;
    this.apellidos = this.formRegisterRol.value.apellidos;
    this.direccion = this.formRegisterRol.value.direccion;
    this.ciudad = this.formRegisterRol.value.ciudad;
    this.codigo_postal = this.formRegisterRol.value.codigo_postal;
    this.telefono = this.formRegisterRol.value.telefono;

    console.log(this.formRegisterRol.value.codigo_postal.valid)
    if(this.formRegisterRol.value.nombre.valid && this.formRegisterRol.value.apellidos.valid && this.formRegisterRol.value.direccion.valid && this.formRegisterRol.value.ciudad.valid && this.formRegisterRol.value.codigo_postal.valid && this.formRegisterRol.value.telefono.valid) {


      this.enableFieldset();
    }


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

  enableFieldset() {
    this.renderer2.removeAttribute(this.fieldset.nativeElement, "disabled");
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

  getDataUsuario() {

  }

  getDataRol() {

  }

}
