import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesGalleryComponent } from './recipes-gallery.component';

describe('RecipesGalleryComponent', () => {
  let component: RecipesGalleryComponent;
  let fixture: ComponentFixture<RecipesGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecipesGalleryComponent]
    });
    fixture = TestBed.createComponent(RecipesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
