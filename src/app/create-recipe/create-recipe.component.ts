import { Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { NgFor, NgIf } from "@angular/common";
import { DishType } from "src/app/models/DishType";
import { Router, RouterModule } from "@angular/router";
@Component({
  selector: "app-create-recipe",
  templateUrl: "./create-recipe.component.html",
  styleUrls: ["./create-recipe.component.css"],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
    NgFor,
    RouterModule,
  ],
})
export class CreateRecipeComponent {
  submitted: boolean = false;

  // private URL_PATTERN =
  //   /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/i;

  private IMAGE_URL_PATTERN =
    /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|bmp|svg)/;

  constructor(private router: Router) {}

  createRecipeForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(2)]),
    summary: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(300),
    ]),
    imageUrl: new FormControl("", [Validators.pattern(this.IMAGE_URL_PATTERN)]),
    preparationMinutes: new FormControl("", [
      Validators.required,
      Validators.min(1),
    ]),
    cookingMinutes: new FormControl("", [
      Validators.required,
      Validators.min(1),
    ]),
    servings: new FormControl("", [Validators.required, Validators.min(1)]),
    pricePerServing: new FormControl("", [
      Validators.required,
      Validators.min(0),
    ]),
    dishTypes: new FormControl([], [Validators.required]),
    extendedIngredients: new FormControl("", [Validators.required]),
    analyzedInstructions: new FormControl("", [Validators.required]),
  });

  // Dish Type Options
  dishTypeOptions: DishType[] = [
    { value: "main-course", viewValue: "Main Course" },
    { value: "side-dish", viewValue: "Side Dish" },
    { value: "dessert", viewValue: "Dessert" },
    { value: "appetizer", viewValue: "Appetizer" },
    { value: "salad", viewValue: "Salad" },
    { value: "bread", viewValue: "Bread" },
    { value: "breakfast", viewValue: "Breakfast" },
    { value: "soup", viewValue: "Soup" },
    { value: "beverage", viewValue: "Beverage" },
    { value: "sauce", viewValue: "Sauce" },
    { value: "marinade", viewValue: "Marinade" },
    { value: "fingerfood", viewValue: "Fingerfood" },
    { value: "snack", viewValue: "Snack" },
    { value: "drink", viewValue: "Drink" },
  ];

  dishTypeOptionControl = new FormControl(this.dishTypeOptions[0].value);
  dishTypeOptionsForm = new FormGroup({
    dishTypeOption: this.dishTypeOptionControl,
  });

  // Functions that check if there is an error and return appropriate error message
  getErrorMessageTitle() {
    const recipeTitleInput = this.createRecipeForm.get("title");

    if (recipeTitleInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return recipeTitleInput!.hasError("minlength")
      ? "Title must be min 2 chars long."
      : "";
  }

  getErrorMessageSummary() {
    const recipeSummaryInput = this.createRecipeForm.get("summary");

    if (recipeSummaryInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return recipeSummaryInput!.hasError("minlength")
      ? "Summary must be min 5 chars long."
      : "";
  }

  getErrorMessageImageUrl() {
    const recipeImageUrlInput = this.createRecipeForm.get("imageUrl");

    return recipeImageUrlInput!.hasError("pattern")
      ? "Not a valid image URL."
      : "";
  }

  getErrorMessagePreparationMinutes() {
    const recipePreparationMinutesInput =
      this.createRecipeForm.get("preparationMinutes");

    if (recipePreparationMinutesInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return recipePreparationMinutesInput!.hasError("min")
      ? "Preparation minutes must be at least 1."
      : "";
  }

  getErrorMessageCookingMinutes() {
    const recipeCookingMinutesInput =
      this.createRecipeForm.get("cookingMinutes");

    if (recipeCookingMinutesInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return recipeCookingMinutesInput!.hasError("min")
      ? "Cooking minutes must be at least 1."
      : "";
  }

  getErrorMessageServings() {
    const recipeServingsInput = this.createRecipeForm.get("servings");

    if (recipeServingsInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return recipeServingsInput!.hasError("min")
      ? "Preparation minutes must be min 1."
      : "";
  }

  getErrorMessagePricePerServing() {
    const recipePricePerServingInput =
      this.createRecipeForm.get("pricePerServing");

    if (recipePricePerServingInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return recipePricePerServingInput!.hasError("min")
      ? "Price per serving must be a positive number."
      : "";
  }

  getErrorMessageDishTypes() {
    const recipeDishTypesInput = this.createRecipeForm.get("dishTypes");

    return recipeDishTypesInput!.hasError("required")
      ? "You must enter a value."
      : "";
  }

  getErrorMessageExtendedIngredients() {
    const recipeExtendedIngredientsInput = this.createRecipeForm.get(
      "extendedIngredients"
    );

    return recipeExtendedIngredientsInput!.hasError("required")
      ? "You must enter a value."
      : "";
  }

  getErrorMessageAnalyzedInstructions() {
    const recipeAnalyzedInstructionsInput = this.createRecipeForm.get(
      "analyzedInstructions"
    );

    return recipeAnalyzedInstructionsInput!.hasError("required")
      ? "You must enter a value."
      : "";
  }

  // Create recipe function that will be called on form submit event
  createRecipe() {}
}
