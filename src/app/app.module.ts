import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { HomeComponent } from './components/home/home.component';
import { SubmitApplicationComponent } from './components/submit-application/submit-application.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    RegisterComponent,
    LoginComponent
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
    AngularToastifyModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
