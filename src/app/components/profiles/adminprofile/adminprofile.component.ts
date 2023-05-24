import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activateRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
  }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.adminId;
      let response: any = await this.adminService.getByUserId(currentId);
      this.admin = response;
    });
  }

}


