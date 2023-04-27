import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDesignationComponent } from './user-designation.component';

describe('UserDesignationComponent', () => {
  let component: UserDesignationComponent;
  let fixture: ComponentFixture<UserDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
