import { NgModule, Injectable } from '@angular/core';
import { Routes, Router, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PlatformComponent } from './platform/platform.component';
import { LoginComponent } from './login/login.component';
import { AuthAccessGuard } from './authentication/AuthGuard';

const routes: Routes = [
  {
    path: 'platform',
    component: PlatformComponent,
    children: [],
    canActivate: [AuthAccessGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: '',
    redirectTo: 'platform',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
