import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent {

  logados: boolean = true;
  data: object = {}

  constructor(
    private profileService: ProfileService,
  ) {
  }

  async onInit() {
    this.data = await this.profileService.getProfile();
    console.log(this.data)
  }

}
