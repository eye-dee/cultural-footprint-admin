import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClusterViewComponent} from './cluster-view/cluster-view.component';
import {ClustersComponent} from './clusters/clusters.component';
import {OktaAuthGuard, OktaCallbackComponent, OktaLoginRedirectComponent} from '@okta/okta-angular';

const appRoutes: Routes = [
  {path: 'login', component: OktaLoginRedirectComponent},
  {
    path: 'clusters/:id',
    component: ClusterViewComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'clusters',
    component: ClustersComponent,
    canActivate: [OktaAuthGuard],
  },
  {path: 'implicit/callback', component: OktaCallbackComponent},
  {path: '', redirectTo: '/clusters', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
