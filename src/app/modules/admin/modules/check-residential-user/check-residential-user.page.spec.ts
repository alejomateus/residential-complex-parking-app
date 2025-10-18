import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckResidentialUserPage } from './check-residential-user.page';

describe('CheckResidentialUserPage', () => {
  let component: CheckResidentialUserPage;
  let fixture: ComponentFixture<CheckResidentialUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckResidentialUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
