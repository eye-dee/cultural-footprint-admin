import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OktaAuthService} from '@okta/okta-angular';
import {RawRecord} from '../models/raw.record';
import {from, Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RawRecordService {

  constructor(
    private http: HttpClient,
    private authService: OktaAuthService,
  ) {
  }

  private static mapToStatus(tweet) {
    if (tweet.approved) {
      return 'approval';
    } else {
      return 'withdrawal';
    }
  }


  updateApproval(tweet: RawRecord): Observable<any> {
    return from(this.authService.getAccessToken())
      .pipe(
        flatMap((accessToken) => this.http.post(
          `/api/raw-records/${tweet.id}/${RawRecordService.mapToStatus(tweet)}`, {}, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            }
          })
        )
      );
  }
}
