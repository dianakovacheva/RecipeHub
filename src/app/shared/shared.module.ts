import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressSpinnerComponent } from "./progress-spinner/progress-spinner.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, ProgressSpinnerComponent],
  exports: [ProgressSpinnerComponent],
})
export class SharedModule {}
