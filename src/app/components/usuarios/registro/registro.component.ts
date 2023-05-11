import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  insertId: number = 0;
  userRole: string = '';

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
    if($event.target.attributes.for.value === 't2') {
      this.enable();
    } else if($event.target.attributes.for.value === 't3') {

      this.disable();
      this.enablet3();
    }
  }

}
