import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotMatchFeildComponent } from './not-match-feild.component';

describe('NotMatchFeildComponent', () => {
  let component: NotMatchFeildComponent;
  let fixture: ComponentFixture<NotMatchFeildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotMatchFeildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotMatchFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
