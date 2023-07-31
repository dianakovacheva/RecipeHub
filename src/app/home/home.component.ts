import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { NgFor } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { ProgressSpinnerComponent } from "src/app/sharedComponents/progress-spinner/progress-spinner.component";

/**
 * @title Dynamic grid-list
 */

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    RouterModule,
    ProgressSpinnerComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
