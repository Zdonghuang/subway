import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevContentService {
  constructor(private http: HttpClient) { }

  getEmail() {
    return this.http.get<any>(`/middle-manager/v2/emailforadmin/getemail`);
  }
  updateEmail(obj) {
    return this.http.post<any>(`/middle-manager/v2/emailforadmin/updateemail`, obj);
  }
  emailImg(domain, obj) {
    return this.http.post<any>(`/middle-manager/v2/imagesforadmin/uploadimage?domainShortName=${domain}`, obj);
  }
  getDevInfo() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/indexinfokey`);
  }
  addApi(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/addcommoninfo`, obj);
  }
  getMarkDown() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/markdown`);
  }
  getRegister() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/register`);
  }
  getInternetPlatform() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/internetPlatform`);
  }
  getIntelligentHardware() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/intelligentHardware`);
  }
  getCoopertion() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/Coopertion`);
  }
  getCarousel() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/Carousel`);
  }
  getEmailAdmin() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/emailForAdminconfig`);
  }
  getAdmin() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/emailForAdminconfig_user`);
  }
  updated(key, obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_${key}`, obj);
  }
}
