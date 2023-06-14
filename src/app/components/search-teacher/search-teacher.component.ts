import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  currentId: number = 0;

  search: boolean = true;

  listaNiveles: string[] = ["Primaria", "ESO", "FP", "Bachillerato", "Diplomatura", "Grado", "Máster y Doctorado", "Personas Mayores"];

  teachers_list: any = [];
  teachers_page: any = [];
  totalTeachers_page: any = [];

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
  cuota: number = 0;

  resultadoFiltrado: any;

  ordenar: string = '';
  ordenadoPor: string = '';

  status: number = 1;


  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private teachersService: TeachersService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.currentId = params.studentId;

      try {
        let response: any = await this.alumnosService.getByUserId(this.currentId);
        this.student = response;

        this.status = response.status;
      } catch (error) {
        alert(error);
      }
    })

    this.teachers_list = [];
    this.teachers_page = [];

    this.teachers();
  }

  async teachers(pNum: number = 1): Promise<void> {

    try {
      let result: any = await this.teachersService.getTeachersHome(pNum);
      this.currentPage = result.page;
      this.totalPages = result.totalPages;

      if (this.arrPages.length !== this.totalPages) {
        this.arrPages = [];
        for (let i = 1; i <= this.totalPages; i++) {
          this.arrPages.push(i);

          let respuesta: any = await this.teachersService.getTeachersHome(i);
          this.teachers_page = respuesta.results;

          this.totalTeachers_page.push.apply(this.totalTeachers_page, this.teachers_page);
        }
      }
      this.limpiar();
      this.teachers_list = this.totalTeachers_page;

    } catch (error) {
      alert('error');
    }
  }

  limpiar() {
    const resultado: any = document.getElementById('resultado');
    if (resultado) {
      while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
      }
    }
  }

  filtrarProfesor() {

    // setTimeout(() => {
    this.datosFiltrados.materia = this.materia;
    this.datosFiltrados.nivel = this.nivel;
    this.datosFiltrados.cuotamin = this.cuotamin;
    this.datosFiltrados.cuotamax = this.cuotamax;
    this.datosFiltrados.puntuacion = this.puntuacion;

    let datosFiltrados = this.datosFiltrados;

    this.resultadoFiltrado = this.totalTeachers_page.filter(
      function filtrarCuotaMin(teacher: any) {
        let { cuotamin } = datosFiltrados;

        cuotamin = Number(cuotamin);

        if (cuotamin) {
          return teacher.cuota >= cuotamin;
        }
        return teacher;
      }
    ).filter(
      function filtrarCuotaMax(teacher: any) {
        let { cuotamax } = datosFiltrados;

        cuotamax = Number(cuotamax);

        if (cuotamax) {
          return teacher.cuota <= cuotamax;
        }
        return teacher;
      }
    ).filter(
      function filtrarMateria(teacher: any) {
        const { materia } = datosFiltrados;

        if (materia) {
          for (let i = 0; i < teacher.materias.length; i++) {
            return teacher.materias[0].rama === materia;
          }
        }
        return teacher;
      }
    ).filter(
      function filtrarNivel(teacher: any) {
        const { nivel } = datosFiltrados;

        if (nivel) {
          for (let i = 0; i < teacher.materias.length; i++) {
            return teacher.materias[i].nivel === nivel;
          }
        }
        return teacher;
      }
    ).filter(
      function filtrarPuntuacion(teacher: any) {
        let { puntuacion } = datosFiltrados;

        puntuacion = Number(puntuacion);

        if (teacher.promedio.length === 0) {
          teacher.promedio = 0.1;
          if (puntuacion) {
            return ((Number(teacher.promedio) >= puntuacion) && (Number(teacher.promedio) < (puntuacion + 1.9)));
          }
        }

        if (puntuacion) {
          return ((Number(teacher.promedio) >= puntuacion) && (Number(teacher.promedio) < (puntuacion + 1.9)));
        }
        return teacher;
      }
    );

    if (this.resultadoFiltrado.length) {
      if (this.ordenadoPor) {
        switch (this.ordenadoPor) {
          case 'pa':
            this.ordenarCuotaMenorMayor();
            this.ordenadoPor = 'pa';
            break;
          case 'pd':
            this.ordenarCuotaMayorMenor();
            this.ordenadoPor = 'pd';
            break;
          case 'na':
            this.ordenarValoracionMenorMayor();
            this.ordenadoPor = 'na';
            break;
          case 'nd':
            this.ordenarValoracionMayorMenor();
            this.ordenadoPor = 'nd';
            break;
          default:
            this.ordenadoPor = '';
            break;
        }
      } else {
        this.teachers_list = this.resultadoFiltrado;
      }
      return this.resultadoFiltrado;
    } else {

    }

    this.limpiar();
    this.teachers_list = this.resultadoFiltrado;
  }

  ordenarTeachers() {
    // const ordenarProductos = () => {
    switch (this.ordenar) {
      case 'pa':
        this.ordenarCuotaMenorMayor();
        this.ordenadoPor = 'pa';
        break;
      case 'pd':
        this.ordenarCuotaMayorMenor();
        this.ordenadoPor = 'pd';
        break;
      case 'na':
        this.ordenarValoracionMenorMayor();
        this.ordenadoPor = 'na';
        break;
      case 'nd':
        this.ordenarValoracionMayorMenor();
        this.ordenadoPor = 'nd';
        break;
      default:
        this.ordenadoPor = '';
        break;
    }

  }

  ordenarCuotaMenorMayor = () => {
    if (this.resultadoFiltrado) {
      const resultadoOrdenado = this.resultadoFiltrado.sort((a: any, b: any) => a.cuota - b.cuota);
      this.teachers_list = resultadoOrdenado;
    } else {
      const resultadoOrdenado = this.totalTeachers_page.sort((a: any, b: any) => a.cuota - b.cuota);
      this.teachers_list = resultadoOrdenado;
    }
  }


  ordenarCuotaMayorMenor = () => {
    if (this.resultadoFiltrado) {
      const resultadoOrdenado = this.resultadoFiltrado.sort((a: any, b: any) => b.cuota - a.cuota);
      this.teachers_list = resultadoOrdenado;
    } else {
      const resultadoOrdenado = this.totalTeachers_page.sort((a: any, b: any) => b.cuota - a.cuota);
      this.teachers_list = resultadoOrdenado;
    }
  }

  ordenarValoracionMenorMayor = () => {
    if (this.resultadoFiltrado) {
      const resultadoOrdenado = this.resultadoFiltrado.sort((a: any, b: any) => a.promedio - b.promedio);
      this.teachers_list = resultadoOrdenado;
    } else {
      const resultadoOrdenado = this.totalTeachers_page.sort((a: any, b: any) => a.promedio - b.promedio);
      this.teachers_list = resultadoOrdenado;
    }
  }

  ordenarValoracionMayorMenor = () => {
    if (this.resultadoFiltrado) {
      const resultadoOrdenado = this.resultadoFiltrado.sort((a: any, b: any) => b.promedio - a.promedio);
      this.teachers_list = resultadoOrdenado;
    } else {
      const resultadoOrdenado = this.totalTeachers_page.sort((a: any, b: any) => b.promedio - a.promedio);
      this.teachers_list = resultadoOrdenado;
    }
  }
}
