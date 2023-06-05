import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent {

  logado: boolean = true;
  admin: any = {};
  username: string = '';

  checkUsername() {
    const username = localStorage.getItem('username');
    this.username = username ? username : '';
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.checkUsername();

    const userId = localStorage.getItem('user_id')
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.adminId;
      if(userId !== currentId.toString()) {
        localStorage.removeItem('token_login');
        localStorage.removeItem('user_role');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id')
        this.usuariosService.changeLogin(false);
        this.router.navigate(['/home']);
      }
      let response: any = await this.adminService.getByUserId(currentId);
      this.admin = response;
    });
  }


}


