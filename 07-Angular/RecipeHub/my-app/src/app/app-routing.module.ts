import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RecipeListComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page redirects to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
