import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateCourseComponent } from './create-course/create-course.component';

// const appRoute: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'curiosity', component: HomeComponent },
//   { path: 'curiosity/create', component: CreateCourseComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
// ];

const appRoute: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'curiosity', component: HomeComponent },
  {
    path: 'curiosity/create',
    component: HomeComponent,
    children: [{ path: '', component: CreateCourseComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CreateCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
