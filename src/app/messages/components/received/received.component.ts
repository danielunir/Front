import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Mensajes recibidos';

    this.formGetMessage = new FormGroup({
      destinatario: new FormControl("", []),
      remitente: new FormControl("", [])
    }, []);

  }

  ngOnInit(): void {

    const remitenteId: number = this.activatedRoute.snapshot.params['remitenteId'];
    const destinatarioId: number = this.activatedRoute.snapshot.params['destinatarioId'];

    this.remitente = remitenteId;
    this.destinatario = destinatarioId;

  }

  changeOrigin() {
    const intermedia = this.remitente;
    this.remitente = this.destinatario;
    this.destinatario = intermedia;
  }

  async onSubmit() {

    try {
      const response = await this.messageService.getMessages(this.formGetMessage.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
