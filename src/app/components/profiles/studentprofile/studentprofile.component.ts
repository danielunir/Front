import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environments';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';



@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {


  logado: boolean = true;
  student: any = {}
  teachers: any = []
  currentId: number = 0
  status: number = 1;
  baseDownload: string = '';

  previsualizacion: string = '';
  archivos: any = []


  constructor(
    private activateRoute: ActivatedRoute,
    private alumnoService: AlumnosService,
    private usuariosService: UsuariosService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private restService: RestService
  ) {
  }

  async ngOnInit() {
    const userId = localStorage.getItem('user_id')
    this.activateRoute.params.subscribe(async (params: any) => {
      this.currentId = params.studentId;
      if(userId !== this.currentId.toString()) {
        localStorage.removeItem('token_login');
        localStorage.removeItem('user_role');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id')
        this.usuariosService.changeLogin(false);
        this.router.navigate(['/home']);
      }
      let response: any = await this.alumnoService.getByUserId(this.currentId);
      this.student = response;

      this.status = response.status;
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

      this.restService.post(`${environment.base_Url}personal/upload/${this.currentId}`, formularioDeDatos)
        .subscribe((res: any) => {
          console.log('Respuesta del servidor', res)
        })
        setTimeout(() => {
          this.router.navigate([`/studentprofile/${this.currentId}/tables/profesores`]);
        }, 1000)
      } catch (error) {
        console.log('Error', error);
      }
    }

    cancelar(): void {
      this.router.navigate([`/studentprofile/${this.currentId}/tables/profesores`]);
    }

}
