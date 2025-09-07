import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-art',
  templateUrl: 'art.page.html',
  styleUrls: ['./art.page.scss'],
})
export class ArtPageComponent {}

const routes: Routes = [{ path: '', component: ArtPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ArtPageComponentModule {}
