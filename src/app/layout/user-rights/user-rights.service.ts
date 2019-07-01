import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRightsService {
  constructor(private http: HttpClient) { }

  addNav(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/updatepath`, obj);
  }
  upNewRole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/updaterole`, obj);
  }
  upNewqx(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/updatepermission`, obj);
  }
  queryuseronly(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/queryuseronly`, obj);
  }
  adduserrole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/adduserrole`, obj);
  }
  addpermission(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/addpermission`, obj);
  }
  addrole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/addrole`, obj);
  }
  updateuserrole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/updateuserrole`, obj);
  }
  deleteuserrole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/deleteuserrole`, obj);
  }
  deleterole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/deleterole`, obj);
  }
  queryroleall() {
    return this.http.get<any>(`/middle-manager/v2/userforadmin/queryroleall`);
  }
  querypermission(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/querypermission`, obj);
  }
  addrolepermission(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/addrolepermission`, obj);
  }
  deleterolepermission(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/deleterolepermission`, obj);
  }
  queryuserbyrole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/queryuserbyrole`, obj);
  }
  querypermissionsbyrole(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/querypermissionsbyrole`, obj);
  }
}
