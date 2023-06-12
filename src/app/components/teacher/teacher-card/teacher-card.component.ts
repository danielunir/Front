import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent implements OnInit {

  @Input() teacher!: any;

  baseDownload: string = '';

  constructor() { }

  ngOnInit() {
    this.baseDownload = environment.base_Download;
  }
}
