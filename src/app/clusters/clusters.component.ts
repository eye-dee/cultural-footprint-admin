import {Component, OnInit} from '@angular/core';
import {Cluster} from '../models/cluster';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit {
  clusters: Cluster[] = [
    {week: '2020-01', name: 'cluster-1'},
    {week: '2020-02', name: 'cluster-1'},
  ];
  columnsToDisplay = ['name', 'week'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
