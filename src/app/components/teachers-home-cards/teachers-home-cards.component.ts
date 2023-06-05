import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers-home-cards',
  templateUrl: './teachers-home-cards.component.html',
  styleUrls: ['./teachers-home-cards.component.css']
})
export class TeachersHomeCardsComponent implements OnInit {

  @Input() teacher!:any;

  startTotal: number = 5;
  rating!: number;
  startPercentatge!: number;
  startPercentatgeRounded!: string;

  constructor() {

  }

  ngOnInit(): void {
    this.rating = this.teacher.promedio / 2;

    this.startPercentatge = (this.rating / this.startTotal) * 100;
    this.startPercentatgeRounded = `${(Math.round(this.startPercentatge / 10 ) * 10)}%`;
  }
}
