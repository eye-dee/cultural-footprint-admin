import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClustersComponent} from './clusters/clusters.component';
import {MatTableModule} from '@angular/material/table';
import {AppRoutingModule} from './app-routing.module';
import {ClusterViewComponent} from './cluster-view/cluster-view.component';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import {
  OKTA_CONFIG,
  OktaAuthModule,
} from '@okta/okta-angular';

const oktaConfig = {
  issuer: 'https://dev-423382.okta.com/oauth2/ausba82thv9r7TZ4d4x6',
  clientId: '0oabajk7roBAJHm4k4x6',
  redirectUri: 'http://localhost:4200/implicit/callback',
  pkce: false,
};

@NgModule({
  declarations: [
    AppComponent,
    ClustersComponent,
    ClusterViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    AppRoutingModule,
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
