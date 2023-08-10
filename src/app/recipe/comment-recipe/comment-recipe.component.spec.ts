import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRecipeComponent } from './comment-recipe.component';

describe('CommentRecipeComponent', () => {
  let component: CommentRecipeComponent;
  let fixture: ComponentFixture<CommentRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommentRecipeComponent]
    });
    fixture = TestBed.createComponent(CommentRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
