import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitorParkingSpotsPage } from './visitor-parking-spots.page';

describe('VisitorParkingSpotsPage', () => {
  let component: VisitorParkingSpotsPage;
  let fixture: ComponentFixture<VisitorParkingSpotsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorParkingSpotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
