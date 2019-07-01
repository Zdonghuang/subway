import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  constructor(private http: HttpClient) { }

  updateUser(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/updateuserall`, obj);
  }
  delApp(id) {
    return this.http.delete<any>(`/middle-manager/v2/appsforadmin/deleteApp/${id}`);
  }
  addUser(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/adduser`, obj);
  }
  delUser(obj) {
    return this.http.post<any>(`/middle-manager/v2/userforadmin/deleteuser`, obj);
  }
  getList(url, obj) {
    return this.http.post<any>(`/middle-manager${url}`, obj);
  }
  updateImg(obj) {
    return this.http.post<any>(`/auth-center/v2/users/uploadimagewithwatermark`, obj);
  }
  updateAppImg(obj) {
    return this.http.post<any>(`/auth-center/v2/apps/uploadimage`, obj);
  }
  updateApp(obj) {
    return this.http.put<any>(`/middle-manager/v2/appsforadmin/updateApp`, obj);
  }
  getAppList(id, obj) {
    return this.http.post<any>(`/middle-manager/v2/appsforadmin/listApp/${id}`, obj);
  }
}
