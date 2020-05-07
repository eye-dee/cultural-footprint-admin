import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClusterService} from '../service/cluster.service';
import {RawRecord} from '../models/raw.record';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnInit {

  clusterId: string;
  tweets: RawRecord[];

  constructor(
    private router: ActivatedRoute,
    private clusterService: ClusterService
  ) {
  }

  ngOnInit(): void {
    this.clusterId = this.router.snapshot.paramMap.get('id');
    this.clusterService.getClusterById(this.clusterId).subscribe((res) => {
      this.tweets = res.records;
    });
  }

  approveTweet(tweet: RawRecord) {
    console.log(`approve for tweet ${tweet.id}`);
  }
}
