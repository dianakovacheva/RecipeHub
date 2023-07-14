import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';

import { AppComponent } from '../app/app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { RecipeListComponent } from './main/recipe-list/recipe-list.component';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    RecipeListComponent,
    BrowserAnimationsModule,
    MatCommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
