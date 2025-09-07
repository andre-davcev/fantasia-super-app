import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponentRoutes } from './main.component.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(MainComponentRoutes)],
})
export class MainComponentModule {}
