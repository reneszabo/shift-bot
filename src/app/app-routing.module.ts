import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainViewComponent} from './views/main-view/main-view.component';
import {minorViewComponent} from './views/minor-view/minor-view.component';
import {blankComponent} from './components/common/layouts/blank.component';
import {basicComponent} from './components/common/layouts/basic.component';

const routes: Routes = [
  {path: '', redirectTo: 'mainView', pathMatch: 'full'},
  // App views
  {
    path: '', component: basicComponent,
    children: [
      {path: 'mainView', component: MainViewComponent},
      {path: 'minorView', component: minorViewComponent}
    ]
  },
  // {
    // path: '', component: blankComponent,
    // children: [
      // { path: 'login', component: loginComponent },
      // { path: 'register', component: registerComponent }
    // ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }