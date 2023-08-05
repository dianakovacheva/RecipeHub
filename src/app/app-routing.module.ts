import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { CreateRecipeComponent } from "./recipe/create-recipe/create-recipe.component";
import { RecipeDetailsComponent } from "./recipe/recipe-details/recipe-details.component";
import { RecipeCatalogComponent } from "./recipe/recipe-catalog/recipe-catalog.component";
import { LoggedInGuard } from "./shared/guards/logged-in.guard";
import { RecipeOwnerGuard } from "./shared/guards/recipe-owner.guard";
const routes: Routes = [
  {
    path: "",
    title: "Home",
    pathMatch: "full",
    redirectTo: "/",
  },
  {
    path: "",
    title: "Home",
    component: HomeComponent,
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./user/user.module").then((model) => model.UserModule),
  },
  { path: "recipes", title: "Recipes", component: RecipeCatalogComponent },
  {
    path: "recipe-details/:recipeId/edit",
    title: "Edit Recipe",
    component: CreateRecipeComponent,
    canActivate: [RecipeOwnerGuard],
  },
  {
    path: "recipe-details/:recipeId",
    title: "Recipe Details",
    component: RecipeDetailsComponent,
  },
  {
    path: "create-recipe",
    title: "Create Recipe",
    component: CreateRecipeComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: "**",
    title: "Page Not Found",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
