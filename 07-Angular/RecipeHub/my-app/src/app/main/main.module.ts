import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [RecipeListComponent, CommonModule],
  exports: [RecipeListComponent],
})
export class MainModule {}
