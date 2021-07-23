import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCaseComponent } from './components/add-case/add-case.component';
import { EditCaseComponent } from './components/edit-case/edit-case.component';
import { CasesListComponent } from './components/cases-list/cases-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { UsersRegisterComponent } from './components/users-register/users-register.component';
import { UsersLoginComponent } from './components/users-login/users-login.component';
import { UserNavigationComponent } from './components/user-navigation/user-navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCaseComponent,
    EditCaseComponent,
    CasesListComponent,
    UsersRegisterComponent,
    UsersLoginComponent,
    UserNavigationComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
