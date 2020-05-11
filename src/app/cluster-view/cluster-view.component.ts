import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClusterService} from '../service/cluster.service';
import {RawRecord} from '../models/raw.record';
import {RawRecordService} from '../service/raw-record.service';
import {Cluster, ClusterStatus} from '../models/cluster';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnInit {

  clusterId: string;
  cluster: Cluster;
  tweets: RawRecord[];

  constructor(
      private router: ActivatedRoute,
      private clusterService: ClusterService,
      private rawRecordService: RawRecordService,
  ) {
  }

  ngOnInit(): void {
    this.clusterId = this.router.snapshot.paramMap.get('id');
    this.clusterService.getClusterById(this.clusterId).subscribe((res) => {
      this.cluster = res.cluster;
      this.tweets = res.records;
    });
  }

  approveTweet(tweet: RawRecord) {
    tweet.approved = !tweet.approved;
    this.rawRecordService.updateApproval(tweet)
    .subscribe((res) => console.log(res));
  }

  isApproved() {
    return this.cluster.status === ClusterStatus.APPROVED;
  }

  isDeclined() {
    return this.cluster.status === ClusterStatus.DECLINED;
  }

  approveCluster() {
    this.clusterService.updateClusterStatus(
        {
          ...this.cluster,
          status: ClusterStatus.APPROVED,
        }
    ).subscribe((res) => this.cluster.status = ClusterStatus.APPROVED);
  }

  declineCluster() {
    this.clusterService.updateClusterStatus(
        {
          ...this.cluster,
          status: ClusterStatus.DECLINED,
        }
    ).subscribe((res) => this.cluster.status = ClusterStatus.DECLINED);
  }
}
