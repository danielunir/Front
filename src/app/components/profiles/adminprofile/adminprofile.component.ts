import { Component } from '@angular/core';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent {

  logados: boolean = true;
  data: any = {}

  constructor(

  ) {
  }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id');

  }

}


