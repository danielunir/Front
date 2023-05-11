import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';



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

  insertId: number = 0;
  insertIdProfesor: number = 0;

  values: any;
  valuesNivel: any;
  valuesArea: any;

  constructor(
    private renderer2: Renderer2,
    private router: Router
    ) {

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
    if ($event.target.attributes.for.value === 't2') {
      this.enable();
    } else if ($event.target.attributes.for.value === 't3') {

      this.disable();
      this.enablet3();
    }
  }
}
