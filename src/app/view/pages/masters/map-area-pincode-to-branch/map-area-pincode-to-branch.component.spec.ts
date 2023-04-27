import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAreaPincodeToBranchComponent } from './map-area-pincode-to-branch.component';

describe('MapAreaPincodeToBranchComponent', () => {
  let component: MapAreaPincodeToBranchComponent;
  let fixture: ComponentFixture<MapAreaPincodeToBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapAreaPincodeToBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapAreaPincodeToBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
