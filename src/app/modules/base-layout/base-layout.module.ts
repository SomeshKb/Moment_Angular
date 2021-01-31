import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    BaseLayoutRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class BaseLayoutModule { }
