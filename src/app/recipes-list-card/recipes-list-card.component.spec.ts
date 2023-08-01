import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesListCardComponent } from './recipes-list-card.component';

describe('RecipesListCardComponent', () => {
  let component: RecipesListCardComponent;
  let fixture: ComponentFixture<RecipesListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecipesListCardComponent]
    });
    fixture = TestBed.createComponent(RecipesListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
