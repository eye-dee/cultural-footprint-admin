import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Tweet} from '../models/tweet';

@Component({
  selector: 'app-cluster-view',
  templateUrl: './cluster-view.component.html',
  styleUrls: ['./cluster-view.component.css']
})
export class ClusterViewComponent implements OnInit {

  clusterId: string;
  tweets: Tweet[] = [
    {id: '1', text: 'tweet 1 asdasdasd asd asd asda sd asd asd asd asd asd', approved: false},
    {id: '2', text: 'tweet 2 asdasdasd asd asd asda sd asd asd asd asd asd', approved: false},
  ];

  constructor(
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.clusterId = this.router.snapshot.paramMap.get('id');
  }

  approveTweet(tweet: Tweet) {
    console.log(`approve for tweet ${tweet.id}`);
  }
}
