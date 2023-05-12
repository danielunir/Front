import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-info-usuarios',
  templateUrl: './info-usuarios.component.html',
  styleUrls: ['./info-usuarios.component.css']
})
export class InfoUsuariosComponent {

  @ViewChild("t1")t1!: ElementRef;
  @ViewChild("t2")t2!: ElementRef;

  userId!: number;
  role: string = '';

  constructor(
    private renderer2: Renderer2,
    private profileService: ProfileService
  ) {

  }

  disable() {
    this.renderer2.setAttribute(this.t2.nativeElement, 'disabled', 'true');
    this.renderer2.removeAttribute(this.t2.nativeElement, 'checked');
  }

  enable() {
    this.renderer2.removeAttribute(this.t2.nativeElement, "disabled");
    this.renderer2.setAttribute(this.t2.nativeElement, 'checked', 'true');
    this.renderer2.removeAttribute(this.t1.nativeElement, 'checked');
  }

  continue($event: any) {
    if($event.target.attributes.for.value === 't2') {
      this.enable();
    }
  }



  getRol($event: any){
    this.role = $event;
    console.log($event);
  }

  getUserId($event: any) {
    this.userId = $event;
  }


}
