import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private http: HttpClient) { }

  getDomainInfoList() {
    return this.http.get<any>(`/middle-manager/v2/domaininfoforadmin/getDomainInfoList`);
  }
}
