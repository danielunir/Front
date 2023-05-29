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


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'info-usuario', component: InfoUsuariosComponent },
  { path: 'teachers', component: TeacherComponent },
  { path: 'studentprofile/:studentId', component: StudentprofileComponent },
  { path: 'studentprofile/:studentId/search', component: SearchTeacherComponent },
  { path: 'teacherprofile/:teacherId', component: TeacherprofileComponent },
  { path: 'adminprofile/:adminId', component: AdminprofileComponent },
  { path: 'adminprofile/:adminId/tables/:tableType', component: TableInfoComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HomeGuard]
})
export class AppRoutingModule { }
