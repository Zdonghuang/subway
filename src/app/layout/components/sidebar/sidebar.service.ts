import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerStreamFileResponseOptionsWithError } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private http: HttpClient) { }

  getpath() {
    return this.http.get<any>(`/middle-manager/v2/userforadmin/getpath`);
  }
}
