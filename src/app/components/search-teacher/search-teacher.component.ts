import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {

  logado: boolean = true;
  student: any = {};

  search: boolean = true;

  listaNiveles: string[] = ["Primaria", "ESO","FP", "Bachillerato", "Diplomatura", "Grado", "Máster y Doctorado", "Personas Mayores"];

  teachers_list: any = [];

  totalPages: number = 0;
  arrPages: number[] = [];
  currentPage: number = 0;

  filterTeacher = '';

  datosFiltrados: any = {
    materia: '',
    nivel: '',
    cuotamin: '',
    cuotamax: '',
    puntuacion: ''
  }

  materia: string = '';
  nivel: string = '';
  cuotamin: string = '';
  cuotamax: string = '';
  puntuacion: string = '';


  resultadoFiltrado: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private teachersService: TeachersService
    ){

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( async (params: any) => {
      console.log(params)
      let currentId: number = params.studentId;

      console.log(currentId)
      try {
        let response: any = await this.alumnosService.getByUserId(currentId);
        console.log(response);
        this.student = response;
      } catch (error) {
        alert(error);
      }
    })

    this.teachers_list = [];

    this.teachers();

    this.resultadoFiltrado = this.teachers_list;
  }

  async teachers(pNum: number = 1): Promise<void> {
    try {
      let result: any = await this.teachersService.getTeachersHome(pNum);
      this.currentPage = result.page;
        this.totalPages = result.totalPages;
        this.teachers_list = result.results;
        console.log(result);
        if (this.arrPages.length !== this.totalPages) {
          this.arrPages = [];
          for (let i = 1; i <= this.totalPages; i++) {
            this.arrPages.push(i);
          }
        }
    } catch (error) {
      alert('No hay profesores disponibles en la BBDD');
    }
  }

  filtrarProfesor() {
    this.resultadoFiltrado = this.teachers_list.filter(this.filtrarCuotaMin).filter(this.filtrarCuotaMax).filter(this.filtrarMateria).filter(this.filtrarNivel).filter(this.filtrarPuntuacion);
  }

  filtrarCuotaMin(teacher: any) {
    const { cuotamin } = this.datosFiltrados;

    if(cuotamin) {
      return teacher.cuota >= cuotamin;
    }
    return teacher;
  }

  filtrarCuotaMax(teacher: any) {
    const { cuotamax } = this.datosFiltrados;

    if(cuotamax) {
      return teacher.cuota <= cuotamax;
    }
    return teacher;
  }

  filtrarMateria(teacher:any) {
    const { materia } = this.datosFiltrados;

    if(materia) {
      return teacher.materia === materia;
    }
    return teacher;
  }

  filtrarNivel(teacher:any) {
    const { nivel } = this.datosFiltrados;

    if(nivel) {
      return teacher.nivel === nivel;
    }
    return teacher;
  }

  filtrarPuntuacion(teacher: any) {
    let { puntuacion } = this.datosFiltrados;

    puntuacion = Number(puntuacion);

    if(puntuacion) {
      return ((teacher.puntuacion >= puntuacion) && (teacher.puntuacion <= (puntuacion + 2)));
    }
    return teacher;
  }

  ActualizarLista() {
    this.datosFiltrados.materia = this.filterTeacher;
    this.datosFiltrados.nivel = this.nivel;
    this.datosFiltrados.cuotamin = this.cuotamin;
    this.datosFiltrados.cuotamax = this.cuotamax;
    this.datosFiltrados.puntuacion = this.puntuacion;

    this.filtrarProfesor();
  }

}
