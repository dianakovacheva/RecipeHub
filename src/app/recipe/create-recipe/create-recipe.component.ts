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
import { NgFor } from "@angular/common";
// import { TimeOption } from "src/app/models/TimeOption";
import { DishType } from "src/app/models/DishType";
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
    NgFor,
  ],
})
export class CreateRecipeComponent {
  submitted: boolean = false;

  // private URL_PATTERN =
  //   /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/i;


  constructor() {}

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

  // initIngredient() {
  //   return new FormGroup({
  //     name: new FormControl("", [Validators.required, Validators.minLength(2)]),
  //     measures: new FormGroup({
  //       metric: new FormGroup({
  //         amount: new FormControl(null, [
  //           Validators.required,
  //           Validators.min(0),
  //         ]),
  //         unitLong: new FormControl("", [
  //           Validators.required,
  //           Validators.minLength(1),
  //         ]),
  //       }),
  //     }),
  //   });
  // }

  // Time Options
  // timeOptions: TimeOption[] = [
  //   { value: "mins-0", viewValue: "mins" },
  //   { value: "hours-1", viewValue: "hours" },
  //   { value: "days-2", viewValue: "days" },
  // ];

  // timeOptionControl = new FormControl(this.timeOptions[0].value);
  // timeOptionsForm = new FormGroup({
  //   timeOption: this.timeOptionControl,
  // });

}
