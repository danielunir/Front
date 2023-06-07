import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title: string;

  remitente: any;
  destinatario: any;

  constructor(

  ) {
    this.title = 'Mensajes privados'


  }

  ngOnInit(): void {

  }

}
