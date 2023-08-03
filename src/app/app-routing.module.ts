import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { CreateRecipeComponent } from "./recipe/create-recipe/create-recipe.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/",
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./user/user.module").then((model) => model.UserModule),
  },
  {
    path: "recipes",
    component: RecipesListComponent,
  },
  {
    path: "create-recipe",
    component: CreateRecipeComponent,
  },
  { path: "recipe-details/:recipeId", component: RecipeDetailsComponent },
  { path: "recipe-details/:recipeId/edit", component: CreateRecipeComponent },

  {
    path: "**",
    component: PageNotFoundComponent,
  }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
