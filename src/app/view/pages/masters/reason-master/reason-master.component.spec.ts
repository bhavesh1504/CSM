import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonMasterComponent } from './reason-master.component';

describe('ReasonMasterComponent', () => {
  let component: ReasonMasterComponent;
  let fixture: ComponentFixture<ReasonMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
