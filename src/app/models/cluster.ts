import {RawRecord} from './raw.record';

export interface Cluster {
  week: string;
  name: string;
  id: string;
}

export interface ClusterResult {
  cluster: Cluster;
  records: RawRecord[];
}
