import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMailboxService {
  constructor(private http: HttpClient) { }

  getMailList(obj) {
    return this.http.post<any>(`/middle-manager/v2/leezemailforadmin/getLeezEmailList`, obj);
  }
  delMail(id) {
    return this.http.post<any>(`/middle-manager/v2/leezemailforadmin/deleteLeezEmail/${id}`, {});
  }
}
