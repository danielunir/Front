import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulo personalizado
import { MessagesModule } from './messages/messages.module';

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
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormPersonalComponent } from './components/form-personal/form-personal.component';
import { FormPerfilTeacherComponent } from './components/form-perfil-teacher/form-perfil-teacher.component';
import { FormPerfilAlumnoComponent } from './components/form-perfil-alumno/form-perfil-alumno.component';
import { InfoUsuariosComponent } from './components/usuarios/info-usuarios/info-usuarios.component';
import { StudentprofileComponent } from './components/profiles/studentprofile/studentprofile.component';
import { TeacherprofileComponent } from './components/profiles/teacherprofile/teacherprofile.component';
import { AdminprofileComponent } from './components/profiles/adminprofile/adminprofile.component';
import { TeacherScoreCardComponent } from './components/teacher/teacher-score-card/teacher-score-card.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environments';
import { MapaComponent } from './components/mapa/mapa.component';
import { CountryViewComponent } from './components/country-view/country-view.component';
import { TeacherScoreComponent } from './components/teacher-score/teacher-score.component';
import { TeachersHomeLogadoComponent } from './components/teachers-home-logado/teachers-home-logado.component';
import { TeachersHomeCardsComponent } from './components/teachers-home-cards/teachers-home-cards.component';
import { TableInfoComponent } from './components/table-info/table-info.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeachersOfAlumnoComponent } from './components/teachers-of-alumno/teachers-of-alumno.component';
import { AlumnosOfTeacherComponent } from './components/alumnos-of-teacher/alumnos-of-teacher.component';
import { MessagesComponent } from './components/messages/messages.component';




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
    FormUserComponent,
    FormPersonalComponent,
    FormPerfilTeacherComponent,
    FormPerfilAlumnoComponent,
    InfoUsuariosComponent,
    ComoFuncionaComponent,
    GraficInfoComponent,
    StudentprofileComponent,
    TeacherprofileComponent,
    AdminprofileComponent,
    TeacherScoreCardComponent,
    MapaComponent,
    CountryViewComponent,
    TeacherScoreComponent,
    TeachersHomeLogadoComponent,
    TeachersHomeCardsComponent,
    TableInfoComponent,
    SpinnerComponent,
    SearchTeacherComponent,
    TeachersOfAlumnoComponent,
    AlumnosOfTeacherComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot(environment.googleMaps),
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
