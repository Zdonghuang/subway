import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  getCode(clientid) {
    return `https://api.ileapcloud.com/auth-center/v2/imagesecurity/securityimagebytes?clientid=${clientid}&time=${Date.now()}`;
  }
  getEnvType() {
    return this.http.get<any>(`/middle-manager/v2/envtypeforadmin/getEnvType`, {headers: {'Authorization': ''}});
  }
  getpath() {
    return this.http.get<any>(`/middle-manager/v2/userforadmin/getpath`);
  }
}
