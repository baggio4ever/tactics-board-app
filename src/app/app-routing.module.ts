import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SoccerFieldComponent }      from './soccer-field/soccer-field.component';
import { AboutComponent }      from './about/about.component';

const routes: Routes = [
  { path: 'soccer-field', component: SoccerFieldComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/soccer-field', pathMatch: 'full' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
