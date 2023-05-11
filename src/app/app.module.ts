import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UneteComponent } from './components/unete/unete.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeacherCardComponent } from './components/teacher/teacher-card/teacher-card.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ComoFuncionaComponent } from './components/como-funciona/como-funciona.component';
import { GraficInfoComponent } from './components/grafic-info/grafic-info.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormPersonalComponent } from './components/form-personal/form-personal.component';
import { FormPerfilTeacherComponent } from './components/form-perfil-teacher/form-perfil-teacher.component';
import { FormPerfilAlumnoComponent } from './components/form-perfil-alumno/form-perfil-alumno.component';
import { InfoUsuariosComponent } from './components/usuarios/info-usuarios/info-usuarios.component';
import { StudentprofileComponent } from './components/profiles/studentprofile/studentprofile.component';
import { TeacherprofileComponent } from './components/profiles/teacherprofile/teacherprofile.component';
import { AdminprofileComponent } from './components/profiles/adminprofile/adminprofile.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UneteComponent,
    RegistroComponent,
    FooterComponent,
    TeacherCardComponent,
    TeacherComponent,
    LoginComponent,
    FormUserComponent,
    FormPersonalComponent,
    FormPerfilTeacherComponent,
    FormPerfilAlumnoComponent,
    InfoUsuariosComponent
    ComoFuncionaComponent,
    GraficInfoComponent,
    StudentprofileComponent,
    TeacherprofileComponent,
    AdminprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
