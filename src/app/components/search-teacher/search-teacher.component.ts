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

  listaNiveles: string[] = ["Primaria", "ESO","FP", "Bachillerato", "Diplomatura", "Grado", "Máster y Doctorado", "Personas Mayores"];

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

  resultadoFiltrado: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private teachersService: TeachersService
    ){

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( async (params: any) => {
      this.currentId = params.studentId;

      try {
        let response: any = await this.alumnosService.getByUserId(this.currentId);
        this.student = response;
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
        for (let i = 1; i < this.totalPages; i++) {
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
    console.log(resultado)
    if(resultado) {
      while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
      }
    }
  }

  filtrarProfesor() {

    setTimeout(() => {
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

          if(cuotamin) {
            return teacher.cuota >= cuotamin;
          }
          return teacher;
        }
        ).filter(
          function filtrarCuotaMax(teacher: any) {
            let { cuotamax } = datosFiltrados;

            cuotamax = Number(cuotamax);

            if(cuotamax) {
              return teacher.cuota <= cuotamax;
            }
            return teacher;
          }
          ).filter(
            function filtrarMateria(teacher:any) {
              const { materia } = datosFiltrados;
              console.log(materia);

              if(materia) {
                for(let i = 0; i < teacher.materias.length; i++){
                  return teacher.materias[i].rama === materia;
                }
              }
              return teacher;
            }
            ).filter(
              function filtrarNivel(teacher:any) {
                const { nivel } = datosFiltrados;

                if(nivel) {
                  return teacher.materias.nivel === nivel;
                }
                return teacher;
              }
              ).filter(
                function filtrarPuntuacion(teacher: any) {
                  let { puntuacion } = datosFiltrados;

                  puntuacion = Number(puntuacion);

                  if(puntuacion) {
                    return ((teacher.puntuacion >= puntuacion) && (teacher.puntuacion <= (puntuacion + 2)));
                  }
                  return teacher;
                }
                );
                this.limpiar();
                this.teachers_list = this.resultadoFiltrado;
              },300)
  }
}
