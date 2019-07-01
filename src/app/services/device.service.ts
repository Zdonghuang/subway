import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  ciot = 'https://api.ileapcloud.com/ciot';
  constructor(private http: HttpClient) { }

  getDeviceList(page) {
    const obj = {
      page: page,
      pageSize: 10,
      order: 'desc',
      orderBy: 'updateTime'
    };
    return this.http.post(`${this.ciot}/deviceForAdmin/listPage`, obj, {headers : {'Authorization': localStorage.getItem('token')}});
  }
  delDevice(id) {
    return this.http.delete(`${this.ciot}/deviceForAdmin/delete/${id}`, {headers : {'Authorization': localStorage.getItem('token')}});
  }
  getAdevice(id) {
    return this.http.get(`${this.ciot}/deviceForAdmin/info/${id}`, {headers : {'Authorization': localStorage.getItem('token')}});
  }
}
