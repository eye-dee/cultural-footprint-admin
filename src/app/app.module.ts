import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClustersComponent} from './clusters/clusters.component';
import {MatTableModule} from '@angular/material/table';
import {AppRoutingModule} from './app-routing.module';
import {ClusterViewComponent} from './cluster-view/cluster-view.component';
import {MatList, MatListModule, MatSelectionList} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ClustersComponent,
    ClusterViewComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatListModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
