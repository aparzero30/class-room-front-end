import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InstructSubjectsComponent } from './instruct-subjects/instruct-subjects.component';
import { HeaderComponent } from './header/header.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { DiscussionpageComponent } from './discussionpage/discussionpage.component';
import { LoadingComponent } from './loading/loading.component';

const appRoute: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'curiosity', component: HomeComponent },
  {
    path: 'curiosity/create',
    component: HomeComponent,
  },
  { path: 'coursepage', component: CoursepageComponent },
  { path: 'discussionpage', component: DiscussionpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    InstructSubjectsComponent,
    HeaderComponent,
    CoursepageComponent,
    DiscussionpageComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
