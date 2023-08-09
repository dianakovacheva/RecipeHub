import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecipeListComponent } from './profile-recipe-list.component';

describe('ProfileRecipeListComponent', () => {
  let component: ProfileRecipeListComponent;
  let fixture: ComponentFixture<ProfileRecipeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileRecipeListComponent]
    });
    fixture = TestBed.createComponent(ProfileRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
