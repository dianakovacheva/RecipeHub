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
import { UserModule } from "./user/user.module";
import { SharedModule } from "./shared/shared.module";
import { CreateRecipeComponent } from "./recipe/create-recipe/create-recipe.component";
import { RecipeDetailsComponent } from "./recipe/recipe-details/recipe-details.component";
import { RecipeCatalogComponent } from "./recipe/recipe-catalog/recipe-catalog.component";

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCommonModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    HomeComponent,
    MatSnackBarModule,
    UserModule,
    SharedModule,
    CreateRecipeComponent,
    RecipeDetailsComponent,
    RecipeCatalogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
