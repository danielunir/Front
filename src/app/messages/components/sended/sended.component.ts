import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-sended',
  templateUrl: './sended.component.html',
  styleUrls: ['./sended.component.css']
})
export class SendedComponent implements OnInit {

  title: string;

  constructor() {
    this.title = 'Mensajes enviados';
  }

  ngOnInit() {
    console.log('Sended Component cargado...');
  }
}
