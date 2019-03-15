import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/Greet', pathMatch: 'full' },
  { path: 'Matches', loadChildren: './home/home.module#HomePageModule' },
  { path: 'Profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'Greet', loadChildren: './greet/greet.module#GreetPageModule' },
  { path: 'callback', redirectTo: '/Matches', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }