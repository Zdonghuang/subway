import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerStreamFileResponseOptionsWithError } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class BackendGitService {
  constructor(private http: HttpClient) { }

  getGitList() {
    return this.http.post<any>(`/middle-manager/v2/git/getGitFileList`, {type: 'all'});
  }
  getAgit(n) {
    return this.http.get(`https://api.ileapcloud.com/middle-manager/v2/git/downloadGit/${n}`, {responseType: 'blob'});
  }
  updateGit(obj) {
    return this.http.post<any>(`https://api.ileapcloud.com/middle-manager/v2/git/pushGit`, obj);
  }
}
