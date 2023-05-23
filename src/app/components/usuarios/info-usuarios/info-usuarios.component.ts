import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-info-usuarios',
  templateUrl: './info-usuarios.component.html',
  styleUrls: ['./info-usuarios.component.css']
})
export class InfoUsuariosComponent implements OnInit {

  logados: boolean = true;

  @ViewChild("t1")t1!: ElementRef;
  @ViewChild("t2")t2!: ElementRef;

  userId!: number;
  role: string = '';

  constructor(
    private renderer2: Renderer2,
    private profileService: ProfileService
  ) {

  }

  async ngOnInit() {
    const data = await this.profileService.getProfile();

    this.userId = data.id;
    // console.log(this.userId);
    this.role = data.role;
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


}
