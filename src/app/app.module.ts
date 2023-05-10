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
import { LoginComponent } from './components/usuarios/login/login.component';
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
