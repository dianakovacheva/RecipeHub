import { Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

/**
 * @title Basic progress-spinner
 */

@Component({
  selector: "app-progress-spinner",
  templateUrl: "./progress-spinner.component.html",
  styleUrls: ["./progress-spinner.component.css"],
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class ProgressSpinnerComponent {}
