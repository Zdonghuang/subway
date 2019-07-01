import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getApiList(page, pagesize, order, orderby) {
    const obj = {
      page,
      pagesize,
      order,
      orderby
    };
    return this.http.post(`/middle-manager/v2/apiforadmin/queryapiall`, obj);
  }
  getAnApi(page, pagesize, order, orderby, apiname) {
    const obj = {
      page,
      pagesize,
      order,
      orderby,
      apiname
    };
    return this.http.post(`/middle-manager/v2/apiforadmin/queryapionly`, obj);
  }
  updatedApi(obj) {
    return this.http.post(`/middle-manager/v2/apiforadmin/updateapi`, obj);
  }
  deleteApi(id) {
    return this.http.post(`/middle-manager/v2/apiforadmin/deleteapi`, {id});
  }
  addApi(obj) {
    return this.http.post(`/middle-manager/v2/apiforadmin/addapi`, obj);
  }
}
