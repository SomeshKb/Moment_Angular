import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AuthService } from './core/services/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
      canActivate: [AuthGuardService]
  },
  {
    path: 'moment',
    loadChildren: () =>
      import('./modules/moment/moment.module').then((m) => m.MomentModule),
      canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
