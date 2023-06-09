import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-teachers-home-cards',
  templateUrl: './teachers-home-cards.component.html',
  styleUrls: ['./teachers-home-cards.component.css']
})
export class TeachersHomeCardsComponent implements OnInit {

  @Input() teacher!: any;

  startTotal: number = 5;
  rating!: number;
  startPercentatge!: number;
  startPercentatgeRounded!: string;

  formCrearClase: FormGroup;

  profesor_id: any;
  alumno_id: any;
  rama_co_id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private claseService: ClaseService,
    private alumnosService: AlumnosService
  ) {

    this.formCrearClase = new FormGroup({
      profesor_id: new FormControl("", []),
      alumno_id: new FormControl("", []),
      rama_co_id: new FormControl("", [])
    }, []);
  }

  async ngOnInit() {
    this.rating = this.teacher.promedio / 2;

    this.startPercentatge = (this.rating / this.startTotal) * 100;

    this.startPercentatgeRounded = `${(Math.round(this.startPercentatge / 10) * 10)}%`;


    const usuarioId: number = this.activatedRoute.snapshot.params['studentId'];

    try {
      const alumno = await this.alumnosService.getByUserId(usuarioId);
      console.log(alumno);
      this.alumno_id = alumno.id;

    } catch (error) {

    }

    this.profesor_id = this.teacher.id;
    this.rama_co_id = this.teacher.materias[0].materia_id;

    console.log(this.teacher);
  }

  solicitarClase() {

  }

  async onSubmit() {

    try {
      const response = await this.claseService.registroClase(this.formCrearClase.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }
}
