import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeModule } from '../../../theme/theme.module';
import { AssignVisitorParkingSpotModalComponent } from './components/assign-visitor-parking-spot-modal/assign-visitor-parking-spot-modal.component';
import { VisitorParkingSpotsPageRoutingModule } from './visitor-parking-spots-routing.module';
import { VisitorParkingSpotsPage } from './visitor-parking-spots.page';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, VisitorParkingSpotsPageRoutingModule, ThemeModule, SharedModule],
	declarations: [VisitorParkingSpotsPage, AssignVisitorParkingSpotModalComponent]
})
export class VisitorParkingSpotsPageModule {}
