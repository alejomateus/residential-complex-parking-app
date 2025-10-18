import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignVisitorParkingSpotModalComponent } from './assign-visitor-parking-spot-modal.component';

describe('AssignVisitorParkingSpotModalComponent', () => {
  let component: AssignVisitorParkingSpotModalComponent;
  let fixture: ComponentFixture<AssignVisitorParkingSpotModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVisitorParkingSpotModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignVisitorParkingSpotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
