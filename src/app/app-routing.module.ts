import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { TeacherroleGuard } from './guards/teacherrole.guard';
import { StudentroleGuard } from './guards/studentrole.guard';
import { AdminroleGuard } from './guards/adminrole.guard';

import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { InfoUsuariosComponent } from './components/usuarios/info-usuarios/info-usuarios.component';
import { StudentprofileComponent } from './components/profiles/studentprofile/studentprofile.component';
import { TeacherprofileComponent } from './components/profiles/teacherprofile/teacherprofile.component';
import { AdminprofileComponent } from './components/profiles/adminprofile/adminprofile.component';
import { TableInfoComponent } from './components/table-info/table-info.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeachersOfAlumnoComponent } from './components/teachers-of-alumno/teachers-of-alumno.component';
import { AlumnosOfTeacherComponent } from './components/alumnos-of-teacher/alumnos-of-teacher.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'info-usuario', component: InfoUsuariosComponent },
  { path: 'teachers', component: TeacherComponent, canActivate: [TeacherroleGuard] },
  { path: 'studentprofile/:studentId', component: StudentprofileComponent, canActivate: [StudentroleGuard] },
  { path: 'studentprofile/:studentId/search', component: SearchTeacherComponent, canActivate: [StudentroleGuard] },
  { path: 'teacherprofile/:teacherId', component: TeacherprofileComponent, canActivate: [TeacherroleGuard] },
  { path: 'adminprofile/:adminId', component: AdminprofileComponent, canActivate: [AdminroleGuard] },
  { path: 'adminprofile/:adminId/tables/:tableType', component: TableInfoComponent, canActivate: [AdminroleGuard] },
  { path: 'studentprofile/:studentId/tables/:profesores', component: TeachersOfAlumnoComponent, canActivate: [StudentroleGuard] },
  { path: 'teacherprofile/:teacherId/tables/:alumnos', component: AlumnosOfTeacherComponent, canActivate: [TeacherroleGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HomeGuard, TeacherroleGuard, StudentroleGuard, AdminroleGuard]
})
export class AppRoutingModule { }
