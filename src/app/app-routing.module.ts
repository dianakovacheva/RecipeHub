import { CommentRecipeComponent } from "./recipe/comment-recipe/comment-recipe.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { CreateRecipeComponent } from "./recipe/create-recipe/create-recipe.component";
import { RecipeDetailsComponent } from "./recipe/recipe-details/recipe-details.component";
import { RecipeCatalogComponent } from "./recipe/recipe-catalog/recipe-catalog.component";
import { LoggedInGuard } from "./shared/guards/logged-in.guard";
import { RecipeOwnerGuard } from "./shared/guards/recipe-owner.guard";
import { DeleteRecipeComponent } from "./recipe/delete-recipe/delete-recipe.component";
import { ProfileComponent } from "./user/profile/profile.component";
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
  {
    path: "user/comments",
    component: ProfileComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: "user/profile/saved-recipes",
    component: ProfileComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: "user/profile/recipes",
    component: ProfileComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: "user/profile",
    component: ProfileComponent,
    canActivate: [LoggedInGuard],
  },
  { path: "recipes", title: "Recipes", component: RecipeCatalogComponent },
  // {
  //   path: "recipes/details/:recipeId/save",
  //   title: "Save Recipe",
  //   component: RecipeDetailsComponent,
  //   canActivate: [LoggedInGuard],
  // },
  {
    path: "recipes/details/:recipeId/edit",
    title: "Edit Recipe",
    component: CreateRecipeComponent,
    canActivate: [RecipeOwnerGuard],
  },
  // {
  //   path: "recipes/details/:recipeId/delete",
  //   title: "Delete Recipe",
  //   component: DeleteRecipeComponent,
  //   canActivate: [RecipeOwnerGuard],
  // },
  {
    path: "recipes/details/:recipeId",
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
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
