import { NgModule } from '@angular/core';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from '../about-us/about-us.component';

@NgModule({
  declarations: [RecipeListComponent, PageNotFoundComponent, AboutUsComponent],
  imports: [CommonModule],
  exports: [RecipeListComponent, PageNotFoundComponent, AboutUsComponent],
})
export class MainModule {}
