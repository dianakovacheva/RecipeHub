import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { ProfileComponent } from "../profile/profile.component";
import { LoggedInGuard } from "../../shared/guards/logged-in.guard";
import { GuestOnlyGuard } from "../../shared/guards/guest-only.guard";
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [GuestOnlyGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [GuestOnlyGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [LoggedInGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
