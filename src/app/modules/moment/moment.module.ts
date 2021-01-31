import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentRoutingModule } from './moment-routing.module';
import { MomentListComponent } from './moment-list/moment-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateMomentComponent } from './create-moment/create-moment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMomentComponent } from './edit-moment/edit-moment.component';


@NgModule({
  declarations: [MomentListComponent, CreateMomentComponent, EditMomentComponent],
  imports: [
    CommonModule,
    MomentRoutingModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MomentModule { }
