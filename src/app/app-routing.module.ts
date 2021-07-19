import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProbesComponent } from './probes/probes.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'probes',
    component: ProbesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
