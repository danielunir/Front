import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

const messagesRoutes: Routes = [
  {
    path: 'mensajes', component: MainComponent,
      children: [
        { path: '', redirectTo: 'enviar', pathMatch: 'full' },
        { path: 'enviar', component: AddComponent },
        { path: 'recibidos/:destinatarioId/:remitenteId', component: ReceivedComponent },
        { path: 'enviados', component: SendedComponent }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ]
})
export class MessagesRoutingModule {}
