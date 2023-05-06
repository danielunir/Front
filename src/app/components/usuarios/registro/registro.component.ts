import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  disabled = true;
  contador = 0;
  contadorMax = 255;

  continue($event: any) {

    $event.target.control.disabled = !this.disabled;

    setTimeout(() => {
      $event.target.control.disabled = true;
    }, 100);
  }

  onKey($event: any) {
    this.contador = $event.target.value.length;
    if(this.contador >= this.contadorMax) {
      $event.preventDefault();

    }
  }

}
