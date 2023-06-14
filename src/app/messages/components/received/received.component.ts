import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { RamasService } from 'src/app/services/ramas.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {

  formGetMessage: FormGroup;

  title: string;

  remitente: any;
  destinatario: any;
  alumno: any;
  profesor: any;
  role: string | null= '';

  conversaciones: any;
  conversacionesOrdenadas: any;

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private ramasService: RamasService,
    private alumnosService: AlumnosService
  ) {
    this.title = 'Mensajes';

    this.formGetMessage = new FormGroup({
      destinatario: new FormControl("", []),
      remitente: new FormControl("", [])
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

  async onSubmit() {

    try {
      this.conversaciones = await this.messageService.getMessages(this.formGetMessage.value);

      this.conversacionesOrdenadas = this.conversaciones.sort((a: any, b: any) => new Date(a.fecha_act).getTime() > new Date(b.fecha_act).getTime());

    } catch (error) {
      console.log(error);
    }
  }
}
