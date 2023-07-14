import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';

import { AppComponent } from '../app/app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BrowserAnimationsModule,
    MatCommonModule,
    RecipeListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
