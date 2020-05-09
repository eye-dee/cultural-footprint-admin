import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OktaAuthService} from '@okta/okta-angular';
import {from, Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor(
    private http: HttpClient,
    private authService: OktaAuthService,
  ) {
  }

  getWeeks(): Observable<string[]> {
    return from(this.authService.getAccessToken())
    .pipe(
      flatMap((accessToken) => this.http.get<string[]>('/api/weeks', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        }
      }))
    );
  }
}
