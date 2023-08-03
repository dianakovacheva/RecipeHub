import { Component } from "@angular/core";
import { RecipesGalleryComponent } from "../recipes-gallery/recipes-gallery.component";

@Component({
  selector: "app-recipe-catalog",
  templateUrl: "./recipe-catalog.component.html",
  styleUrls: ["./recipe-catalog.component.css"],
  standalone: true,
  imports: [RecipesGalleryComponent],
})
export class RecipeCatalogComponent {}
