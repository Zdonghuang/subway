import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeezInfoService {
  constructor(private http: HttpClient) { }

  getMailList(obj) {
    return this.http.post<any>(`/leez/v1/joinus/list`, obj);
  }
}
