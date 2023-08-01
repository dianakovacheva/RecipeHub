import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-recipes-list-card",
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: "./recipes-list-card.component.html",
  styleUrls: ["./recipes-list-card.component.css"],
})
export class RecipesListCardComponent {}
