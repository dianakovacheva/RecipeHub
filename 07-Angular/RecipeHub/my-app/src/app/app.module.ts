import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from '../app/app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [AppComponent, MainComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    RecipeListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
