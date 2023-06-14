import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sended',
  templateUrl: './sended.component.html',
  styleUrls: ['./sended.component.css']
})
export class SendedComponent implements OnInit {

  formGetMessage: FormGroup;

  title: string;

  remitente: any;
  destinatario: any;

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Mensajes enviados';

     this.formGetMessage = new FormGroup({
       remitente: new FormControl("", []),
      destinatario: new FormControl("", [])
    }, []);
  }

  ngOnInit() {

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
    } catch (error) {
      console.log(error);
    }
  }
}
