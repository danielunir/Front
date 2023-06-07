import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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



  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

    ngOnInit(): void {

      const remitenteId: number = this.activatedRoute.snapshot.params['remitenteId'];
      const destinatarioId: number = this.activatedRoute.snapshot.params['destinatarioId'];

      this.remitente = remitenteId;
      this.destinatario = destinatarioId;

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
      console.log(response);
      this.router.navigate(['/mensajes', 'enviados', this.remitente, this.destinatario]);
    } catch (error) {
      console.log(error);
    }
  }

}
