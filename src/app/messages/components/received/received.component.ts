import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {

  title: string;

  constructor() {
    this.title = 'Mensajes recibidos';
  }

  ngOnInit(): void {
    console.log('Received component cargado...');
  }
}
