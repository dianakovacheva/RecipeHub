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
