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

}
