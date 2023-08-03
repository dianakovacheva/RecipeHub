import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCommonModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { MainComponent } from "./main/main.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { UserModule } from "./user/user.module";
import { CreateRecipeComponent } from "./recipe/create-recipe/create-recipe.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
@NgModule({
  declarations: [AppComponent, MainComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCommonModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    RecipeDetailsComponent,
    HomeComponent,
    UserModule,
    MatSnackBarModule,
    CreateRecipeComponent,
    RecipesListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
