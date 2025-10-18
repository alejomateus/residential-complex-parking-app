import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardOptionsComponent } from './components/dashboard-options/dashboard-options.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AnimateOnScrollDirective } from './directives/animate-on-scroll.directive';

const COMPONENTS = [ScheduleComponent, DashboardOptionsComponent];
const DIRECTIVES = [AnimateOnScrollDirective];

const MODULES = [ FormsModule, ReactiveFormsModule, IonicModule, NgbCarouselModule, IonicModule];
@NgModule({
	declarations: [...COMPONENTS, ...DIRECTIVES],
	imports: [CommonModule, ...MODULES],
	exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES]
})
export class ThemeModule {}
