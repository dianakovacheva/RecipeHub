import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { CreateRecipeComponent } from "./recipe/create-recipe/create-recipe.component";
import { RecipeDetailsComponent } from "./recipe/recipe-details/recipe-details.component";
import { RecipeCatalogComponent } from "./recipe/recipe-catalog/recipe-catalog.component";

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
  { path: "recipes", component: RecipeCatalogComponent },
  {
    path: "recipe-details/:recipeId/edit",
    component: CreateRecipeComponent,
  },
  {
    path: "recipe-details/:recipeId",
    component: RecipeDetailsComponent,
  },
  {
    path: "create-recipe",
    component: CreateRecipeComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
