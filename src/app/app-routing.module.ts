import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCaseComponent} from './components/add-case/add-case.component';
import { EditCaseComponent} from './components/edit-case/edit-case.component';
import { CasesListComponent} from './components/cases-list/cases-list.component';
import { UsersRegisterComponent} from './components/users-register/users-register.component';
import { UsersLoginComponent} from './components/users-login/users-login.component';
import { UserNavigationComponent } from './components/user-navigation/user-navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CaseFilesComponent } from './components/case-files/case-files.component';
import { AdditionalDetailsComponent } from './components/additional-details/additional-details.component';
import { CommunicationDetailsComponent } from './components/communication-details/communication-details.component';
const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'users-login' },
{ path: 'users-register',component:UsersRegisterComponent},
{ path: 'users-login',component:UsersLoginComponent},
{ path: 'case', component: HomePageComponent,
    children: [
      { path: 'add-case', component: AddCaseComponent },
      { path: 'edit-case/:id', component: EditCaseComponent },
      { path: 'cases-list', component: CasesListComponent },
      { path: 'additional-details',component: AdditionalDetailsComponent,
          children:[
            { path: 'files',component:CaseFilesComponent},
            { path: 'communications',component:CommunicationDetailsComponent}
          ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
