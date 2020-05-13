import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClusterService} from '../service/cluster.service';
import {RawRecord} from '../models/raw.record';
import {RawRecordService} from '../service/raw-record.service';
import {Cluster, ClusterStatus} from '../models/cluster';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnInit {

  clusterId: string;
  cluster: Cluster;
  tweets: RawRecord[];
  // tslint:disable-next-line:variable-name
  private _clusterStatus: string;

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

  get clusterStatus(): string {
    return this._clusterStatus;
  }

  set clusterStatus(value: string) {
    switch (value) {
      case 'approved': this.approveCluster(); break;
      case 'declined': this.declineCluster(); break;
    }
    this._clusterStatus = value;
  }

  handleNameEnterPress(event: any) {
    event.stopPropagation();
    event.preventDefault();
    const clusterNameToSave = event.target.value;
    this.clusterService.updateClusterName(this.clusterId, clusterNameToSave)
    .subscribe(() => {
      this.cluster.name = clusterNameToSave;
    });
  }

  publish() {
    this.clusterService.publish(this.clusterId).pipe(
      flatMap(res => this.clusterService.getClusterById(this.clusterId))
    ).subscribe(res => {
      this.cluster = res.cluster;
      this._clusterStatus = this.cluster.status;
    });
  }
}
