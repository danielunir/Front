import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';

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
import { ProfileGuard } from './guards/profile.guard';
import { UserRoleGuard } from './guards/userRole.guard';
import { RoleExistGuard } from './guards/roleExists.guard';
import { MainComponent } from './messages/components/main/main.component';
import { AddComponent } from './messages/components/add/add.component';
import { ReceivedComponent } from './messages/components/received/received.component';
import { MessagesComponent } from './components/messages/messages.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'info-usuario', component: InfoUsuariosComponent, canActivate: [RoleExistGuard] },
  { path: 'teachers', component: TeacherComponent, canActivate: [RoleExistGuard] },
  { path: 'studentprofile/:studentId', component: StudentprofileComponent, canActivate: [ProfileGuard, UserRoleGuard] },
  { path: 'studentprofile/:studentId/search', component: SearchTeacherComponent, canActivate: [UserRoleGuard] },
  { path: 'teacherprofile/:teacherId', component: TeacherprofileComponent, canActivate: [ProfileGuard, UserRoleGuard] },
  { path: 'adminprofile/:adminId', component: AdminprofileComponent, canActivate: [UserRoleGuard] },
  { path: 'adminprofile/:adminId/tables/:tableType', component: TableInfoComponent, canActivate: [UserRoleGuard] },
  { path: 'studentprofile/:studentId/tables/:profesores', component: TeachersOfAlumnoComponent, canActivate: [UserRoleGuard] },
  { path: 'teacherprofile/:teacherId/tables/:alumnos', component: AlumnosOfTeacherComponent, canActivate: [UserRoleGuard] },
  { path:'mensajes', component: MessagesComponent,
  children: [
    { path: '', redirectTo: 'enviar', pathMatch: 'full' },
    { path: 'enviar/:remitenteId/:destinatarioId', component: AddComponent },
    { path: 'recibidos/:destinatarioId/:remitenteId', component: ReceivedComponent }
  ] },
  // { path: 'mensajes', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule) },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HomeGuard, ProfileGuard, UserRoleGuard, RoleExistGuard]
})
export class AppRoutingModule { }
