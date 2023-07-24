import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, UserRoutingModule, LoginComponent, RegisterComponent],
})
export class UserModule {}
