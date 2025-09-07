import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-memories',
  templateUrl: 'memories.page.html',
  styleUrls: ['./memories.page.scss'],
})
export class MemoriesPageComponent {}

const routes: Routes = [{ path: '', component: MemoriesPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MemoriesPageComponentModule {}
