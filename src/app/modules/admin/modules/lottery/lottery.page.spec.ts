import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LotteryPage } from './lottery.page';

describe('LotteryPage', () => {
  let component: LotteryPage;
  let fixture: ComponentFixture<LotteryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
