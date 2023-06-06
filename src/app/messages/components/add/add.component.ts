import { Component, Input, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Message } from '../../../models/message';
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

  message: Message;

  remitente: any;
  destinatario: any;



  constructor(
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.title = 'Enviar mensaje';
      this.message = new Message('', 0, 0, '', '')

      this.formEnvioMensaje = new FormGroup({
        remitente: new FormControl("", []),
        destinatario: new FormControl("", []),
        contenido: new FormControl("", [
          Validators.required
        ])
      }, []);

    }

    ngOnInit(): void {
      console.log('AddComponent cargado...')

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

  async onSubmit() {

    try {
      const response = await this.messageService.addMessage(this.formEnvioMensaje.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

}
