import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'; 


import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { HomeComponent } from './components/home/home.component';
import { SubmitApplicationComponent } from './components/submit-application/submit-application.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { NewsTableComponent } from './components/news-table/news-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselPauseComponent } from './components/carousel-pause/carousel-pause.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'submit-application',
    component: SubmitApplicationComponent
  },
  {
    path: 'student-form',
    component: StudentFormComponent

  },
  {
    path: 'doctor-form',
    component: DoctorFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewsItemComponent,
    HomeComponent,
    SubmitApplicationComponent,
    StudentFormComponent,
    DoctorFormComponent,
    LoginComponent,
    ResetPasswordComponent,
    AdminComponent,
    AdminNavbarComponent,
    NewsTableComponent,
    CarouselPauseComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    AngularToastifyModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgbCarouselModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
