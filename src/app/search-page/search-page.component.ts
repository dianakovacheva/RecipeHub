import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { Recipe } from "../models/Recipe";
import { RecipeService } from "../recipe/recipe.service";
import { ProfileRecipeListComponent } from "../user/profile/profile-recipe-list/profile-recipe-list.component";

@Component({
  selector: "app-search-page",
  standalone: true,
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ProfileRecipeListComponent,
  ],
})
export class SearchPageComponent {
  foundRecipes: Recipe[] = [];
  noResults: boolean = false;
  @Input() searchQuery: string | undefined;

  constructor(private recipeService: RecipeService) {}

  search() {
    this.recipeService.searchRecipes(this.searchQuery).subscribe({
      next: (recipes) => {
        this.foundRecipes = recipes;
        if (this.foundRecipes.length == 0) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      },
      error: (err) => {
        console.error(`Error: ${err}`);
      },
    });
  }
}
