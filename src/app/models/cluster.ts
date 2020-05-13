import {RawRecord} from './raw.record';

export enum ClusterStatus {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED'
}

export interface Cluster {
  week: string;
  name: string;
  id: string;
  status?: ClusterStatus;
  published?: boolean;
}

export interface ClusterResult {
  cluster: Cluster;
  records: RawRecord[];
}
