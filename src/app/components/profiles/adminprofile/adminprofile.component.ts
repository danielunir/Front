import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent {

  logados: boolean = true;
  admin: any = {}

  constructor(
    private adminService: AdminService
  ) {
  }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id');
    this.admin = await this.adminService.getByUserId(userId);
    console.log(this.admin)
  }

}


