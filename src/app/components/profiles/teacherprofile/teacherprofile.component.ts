
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {


  logado: boolean = true;
  teacher: any = {}
  currentId: number = 0;
  baseDownload: string = '';

  previsualizacion: string = '';
  archivos: any = []


  constructor(
    private teacherService: TeachersService,
    private activateRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private restService: RestService
  ) { }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.teacherId;
      if(userId !== this.currentId.toString()) {
        localStorage.removeItem('token_login');
        localStorage.removeItem('user_role');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id')
        this.usuariosService.changeLogin(false);
        this.router.navigate(['/home']);
      }
      let response: any = await this.teacherService.getByUserId(this.currentId);
      this.teacher = response;
    });
    this.baseDownload = environment.base_Download;
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    })
    this.archivos.push(archivoCapturado);

  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return;
    } catch (error) {
      return null;
    }
  })

  subirArchivo(): any {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        formularioDeDatos.append('file0', archivo)
      })

      this.restService.post(`http://localhost:3000/api/personal/upload/${this.currentId}`, formularioDeDatos)
        .subscribe((res: any) => {
          console.log('Respuesta del servidor', res)
        })
        setTimeout(() => {
          console.log(this.currentId)
          this.router.navigate([`/teacherprofile/${this.currentId}/tables/alumnos`]);
        }, 1000)
      } catch (error) {
        console.log('Error', error);
      }
    }

    cancelar(): void {
      this.router.navigate([`/teacherprofile/${this.currentId}/tables/alumnos`]);
    }

}
