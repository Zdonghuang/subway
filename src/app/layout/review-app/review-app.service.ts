import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewAppService {
  constructor(private http: HttpClient) { }

  goReview(id) {
    return this.http.post<any>(`/middle-manager/v2/appsforadmin/deployApp/${id}`, null);
  }
  goRelease(id) {
    return this.http.post<any>(`/middle-manager/v2/appsforadmin/publishApp/${id}`, null);
  }
  goObtained(id) {
    return this.http.post<any>(`/middle-manager/v2/appsforadmin/unDeployApp/${id}`, null);
  }
  upappifo(obj) {
    return this.http.post<any>(`/middle-manager/v2/emailforadmin/sendEmail`, obj);
  }
  updateApp(obj) {
    return this.http.put<any>(`/middle-manager/v2/appsforadmin/updateApp`, obj);
  }
  updateImg(obj) {
    return this.http.post<any>(`/auth-center/v2/apps/uploadimage`, obj);
  }
  deleteAppImage(obj) {
    return this.http.post<any>(`/middle-manager/v2/appsforadmin/deleteAppImage`, obj);
  }
  getAll(obj) {
    return this.http.post<any>(`/middle-manager/v2/appsforadmin/allApp`, obj);
  }
}
