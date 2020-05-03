import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClusterViewComponent} from './cluster-view/cluster-view.component';
import {ClustersComponent} from './clusters/clusters.component';

const appRoutes: Routes = [
  {path: 'clusters/:id', component: ClusterViewComponent},
  {path: 'clusters', component: ClustersComponent},
  {path: '', redirectTo: '/clusters', pathMatch: 'full'}
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
