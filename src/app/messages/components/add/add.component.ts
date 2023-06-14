import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { RamasService } from 'src/app/services/ramas.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formEnvioMensaje: FormGroup;

  title: string;

  remitente: any;
  destinatario: any;
  alumno: any;
  profesor: any;
  role: string | null= '';


  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ramasService: RamasService,
    private alumnosService: AlumnosService
    ) {
      this.title = 'Enviar mensaje';

      this.formEnvioMensaje = new FormGroup({
        remitente: new FormControl("", []),
        destinatario: new FormControl("", []),
        contenido: new FormControl("", [
          Validators.required
        ])
      }, []);

    }

    async ngOnInit() {

      const remitenteId: number = this.activatedRoute.snapshot.params['remitenteId'];
      const destinatarioId: number = this.activatedRoute.snapshot.params['destinatarioId'];

      this.remitente = remitenteId;
      this.destinatario = destinatarioId;

      try {
        this.role = localStorage.getItem('user_role');
        if (this.role === 'profesor') {
          const alumnos = await this.ramasService.getByUserId(remitenteId);
          if (alumnos) {
            let alumno = alumnos.filter((alumno: any) =>
               alumno.alumno.usuario_id === Number(this.destinatario));
            this.alumno = alumno;
          }
        } else if (this.role === 'alumno') {
          const profesores = await this.alumnosService.getAllTeachers(remitenteId);
          if (profesores) {
            let profesor = profesores.filter((profesor: any) => profesor.datos_per.usuario_id === Number(this.destinatario));
            this.profesor = profesor;
          }
        }
      } catch (error) {
        console.log(error);
      }

  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.formEnvioMensaje.get(pControlName)?.hasError(pError) && this.formEnvioMensaje.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  changeOrigin() {
    const intermedia = this.remitente;
    this.remitente = this.destinatario;
    this.destinatario = intermedia;
  }

  async onSubmit() {

    try {
      const response = await this.messageService.addMessage(this.formEnvioMensaje.value);
      this.router.navigate(['/mensajes', 'recibidos', this.destinatario, this.remitente]);
    } catch (error) {
      console.log(error);
    }
  }

}
