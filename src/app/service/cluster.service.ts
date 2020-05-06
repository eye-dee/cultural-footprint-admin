import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cluster} from '../models/cluster';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor(private http: HttpClient) {
  }

  getClusters(): Observable<Cluster[]> {
    return this.http.get<Cluster[]>('/api/clusters');
  }
}
