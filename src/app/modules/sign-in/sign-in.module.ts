import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { SignInPageRoutingModule } from './sign-in-routing.module';
import { SignInPage } from './sign-in.page';

@NgModule({
	imports: [CommonModule, IonicModule, SignInPageRoutingModule, SharedModule, ThemeModule],
	declarations: [SignInPage]
})
export class SignInPageModule {}
