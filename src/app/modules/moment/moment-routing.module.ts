import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMomentComponent } from './create-moment/create-moment.component';
import { EditMomentComponent } from './edit-moment/edit-moment.component';
import { MomentListComponent } from './moment-list/moment-list.component';

const routes: Routes = [
  {
    path: '',
    component: MomentListComponent,
  },
  {
    path: 'create',
    component: CreateMomentComponent,
  },
  {
    path: 'edit/:id',
    component: EditMomentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MomentRoutingModule {}
