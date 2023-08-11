import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentsListComponent } from './profile-comments-list.component';

describe('ProfileCommentsListComponent', () => {
  let component: ProfileCommentsListComponent;
  let fixture: ComponentFixture<ProfileCommentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileCommentsListComponent]
    });
    fixture = TestBed.createComponent(ProfileCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
