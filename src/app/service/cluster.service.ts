import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cluster, ClusterResult, ClusterStatus} from '../models/cluster';
import {from, Observable, of} from 'rxjs';
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

  private static mapStatus(status: ClusterStatus) {
    if (status === ClusterStatus.APPROVED) {
      return 'approval';
    } else {
      return 'declination';
    }
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

  updateClusterStatus(cluster: Cluster): Observable<any> {
    return from(this.authService.getAccessToken())
      .pipe(
        flatMap((accessToken) =>
          this.http.post(`/api/clusters/${cluster.id}/${ClusterService.mapStatus(cluster.status)}`, {}, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            }
          })
        )
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

  updateClusterName(clusterId: string, clusterName: string): Observable<any> {
    return from(this.authService.getAccessToken())
      .pipe(
      flatMap((accessToken) =>
        this.http.put(`/api/clusters/${clusterId}/name`, {name: clusterName}, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          }
        })
      )
    );
  }
}
