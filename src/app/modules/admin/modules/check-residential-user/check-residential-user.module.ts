import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckResidentialUserPageRoutingModule } from './check-residential-user-routing.module';
import { CheckResidentialUserPage } from './check-residential-user.page';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, CheckResidentialUserPageRoutingModule],
	declarations: [CheckResidentialUserPage]
})
export class CheckResidentialUserPageModule {}
