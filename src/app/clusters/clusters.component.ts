import {Component, OnInit} from '@angular/core';
import {Cluster} from '../models/cluster';
import {Router} from '@angular/router';
import {ClusterService} from '../service/cluster.service';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit {
  clusters: Cluster[] = [
    {week: '2020-01', name: 'cluster-1', id: '1'},
    {week: '2020-02', name: 'cluster-1', id: '2'},
  ];
  columnsToDisplay = ['name', 'week'];

  constructor(
    private router: Router,
    private clusterService: ClusterService
  ) {
  }

  ngOnInit(): void {
    this.clusterService.getClusters()
      .subscribe((res) => this.clusters = res);
  }

  viewCluster(cluster: Cluster) {
    console.log(cluster);
    this.router.navigate([`clusters/${cluster.id}`]);
  }
}
