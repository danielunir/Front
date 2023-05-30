import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teachers-home-cards',
  templateUrl: './teachers-home-cards.component.html',
  styleUrls: ['./teachers-home-cards.component.css']
})
export class TeachersHomeCardsComponent {

  @Input() teacher!:any;

  constructor() {

  }
}
