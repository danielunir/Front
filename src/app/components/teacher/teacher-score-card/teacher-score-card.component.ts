import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-score-card',
  templateUrl: './teacher-score-card.component.html',
  styleUrls: ['./teacher-score-card.component.css']
})
export class TeacherScoreCardComponent implements OnInit {

  @Input() teacher!: any;

  startTotal: number = 5;
  rating!: number;
  startPercentatge!: number;
  startPercentatgeRounded!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.rating = this.teacher.promedio_puntuacion / 2;

    this.startPercentatge = (this.rating / this.startTotal) * 100;
    this.startPercentatgeRounded = `${(Math.round(this.startPercentatge / 10 ) * 10)}%`;
  }


}
