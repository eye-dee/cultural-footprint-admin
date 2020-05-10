import {Component, OnInit} from '@angular/core';
import {Cluster, ClusterStatus} from '../models/cluster';
import {Router} from '@angular/router';
import {ClusterService} from '../service/cluster.service';
import {WeekService} from '../service/week.service';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit {
  clusters: Cluster[] = [];
  columnsToDisplay = ['name', 'week', 'status'];
  clusterStatuses = Object.keys(ClusterStatus);
  weeks: string[] = [];
  week: string;

  constructor(
    private router: Router,
    private clusterService: ClusterService,
    private weekService: WeekService
  ) {
  }

  ngOnInit(): void {
    this.weekService.getWeeks()
      .subscribe((res) => {
        this.weeks = res;
        if (this.weeks.length !== 0) {
          this.week = this.weeks[0];
          this.weekSelected();
        }
      });

  }

  viewCluster(cluster: Cluster) {
    console.log(cluster);
    this.router.navigate([`clusters/${cluster.id}`]);
  }

  weekSelected() {
    this.clusterService.getClusters(this.week)
      .subscribe((res) => this.clusters = res);
  }

  changeState(cluster: Cluster) {
    this.clusterService.updateClusterStatus(cluster)
      .subscribe((res) => console.log(res));
  }
}
