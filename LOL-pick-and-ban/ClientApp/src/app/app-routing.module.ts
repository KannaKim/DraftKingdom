import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home.component'
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  id: string;
  constructor() {
    this.id = "abcde"
  }
}
