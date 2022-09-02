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
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadOutline } from '@ant-design/icons-angular/icons'
import { ExcelServiceService } from './services/excel-service.service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
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
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { UpdateNewsComponent } from './components/update-news/update-news.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NewsComponent } from './components/news/news.component';
import { ArchiveTableComponent } from './components/archive-table/archive-table.component';
import { UpdateArchiveComponent } from './components/update-archive/update-archive.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { AllNewsComponent } from './components/all-news/all-news.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { SponsorComponent } from './components/sponsor/sponsor.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

registerLocaleData(en);


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
  },
  {
    path: 'create-news',
    component: CreateNewsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'update-news/:newsId',
    component: UpdateNewsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'update-archive/:newsId',
    component: UpdateArchiveComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'news/:newsId',
    component: NewsComponent
  },
  {
    path: 'archive/:newsId',
    component: ArchiveComponent
  },
  {
    path: 'all-news',
    component: AllNewsComponent
  },
  {
    path: 'sponsor',
    component: SponsorComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  }
]

const icons: IconDefinition[] = [
  UploadOutline
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SubmitApplicationComponent,
    StudentFormComponent,
    DoctorFormComponent,
    LoginComponent,
    ResetPasswordComponent,
    AdminComponent,
    AdminNavbarComponent,
    NewsTableComponent,
    CarouselPauseComponent,
    CreateNewsComponent,
    UpdateNewsComponent,
    LoadingComponent,
    LoadingComponent,
    NewsComponent,
    ArchiveTableComponent,
    UpdateArchiveComponent,
    ArchiveComponent,
    AllNewsComponent,
    ImageUploadComponent,
    StudentsTableComponent,
    StudentsTableComponent,
    SponsorComponent,
    AboutUsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
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
    BrowserAnimationsModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule.forChild(icons),
    NzCollapseModule,
    NzAutocompleteModule
    
 ],
  providers: [ToastService, { provide: NZ_I18N, useValue: en_US }, {provide: NzMessageService}, ExcelServiceService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
