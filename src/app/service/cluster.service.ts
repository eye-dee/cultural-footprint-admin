import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cluster, ClusterResult} from '../models/cluster';
import {from, Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';
import {flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor(
    private http: HttpClient,
    private authService: OktaAuthService,
  ) {
  }

  getClusters(week: string): Observable<Cluster[]> {
    return from(this.authService.getAccessToken())
      .pipe(
        flatMap((accessToken) => this.http.get<Cluster[]>('/api/clusters', {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
          params: {
            week
          }
        }))
      );
  }

  getClusterById(id: string): Observable<ClusterResult> {
    return from(this.authService.getAccessToken())
      .pipe(
        flatMap((accessToken) => this.http.get<ClusterResult>(`/api/clusters/${id}`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          }
        }))
      );
  }
}
