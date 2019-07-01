import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackManagementService {
  constructor(private http: HttpClient) { }

  getCommoninfo() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/spring.cloud.config.server.git.uri`);
  }
  updateCommoninfo(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_spring.cloud.config.server.git.uri`, obj);
  }
  getWhiteList() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/auth_whitelist`);
  }
  getApi() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/apiAuthPrefix`);
  }
  getEmail() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/emailFilterByIp`);
  }
  updateEmail(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_emailFilterByIp`, obj);
  }
  getSms() {
    return this.http.get<any>(`/middle-manager/v2/commoninfoforadmin/smsFilterByIp`);
  }
  updateSms(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_smsFilterByIp`, obj);
  }
  getVapi(obj) {
    return this.http.post<any>(`/middle-manager/v2/apiMapperAdmin/selectAllApiMapper`, obj);
  }
  getVapiconfig(obj) {
    return this.http.post<any>(`/middle-manager/v2/apiMapperAdmin/selectAllApiMapperConfig`, obj);
  }
  delVapi(id) {
    return this.http.delete<any>(`/middle-manager/v2/apiMapperAdmin/deleteApiMapper/${id}`);
  }
  delVapiconfig(id) {
    return this.http.delete<any>(`/middle-manager/v2/apiMapperAdmin/deleteApiMapperConfig/${id}`);
  }
  addVapi(obj) {
    return this.http.post<any>(`/middle-manager/v2/apiMapperAdmin/insterApiMapper`, obj);
  }
  addVapiconfig(obj) {
    return this.http.post<any>(`/middle-manager/v2/apiMapperAdmin/insterApiMapperConfig`, obj);
  }
  updateVapis(obj) {
    return this.http.post<any>(`/middle-manager/v2/apiMapperAdmin/updateApiMapper`, obj);
  }
  updateVapiconfig(obj) {
    return this.http.post<any>(`/middle-manager/v2/apiMapperAdmin/updateApiMapperConfig`, obj);
  }
  addWhite(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_auth_whitelist`, obj);
  }
  addWhites(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_apiAuthPrefix`, obj);
  }
  updateWhite(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_auth_whitelist`, obj);
  }
  updateWhites(obj) {
    return this.http.post<any>(`/middle-manager/v2/commoninfoforadmin/update_apiAuthPrefix`, obj);
  }
  getLogList(obj) {
    return this.http.post<any>(`/middle-manager/v2/busioperlogsforadmin/searchLog`, obj);
  }
  getCountNum() {
    return this.http.get<any>(`/middle-manager/v2/otherforadmin/querysmscount`);
  }
  getRouteList(obj) {
    return this.http.post<any>(`/middle-manager/v2/gatewayrouteforadmin/searchRoute`, obj);
  }
  getSenList(obj) {
    return this.http.post<any>(`/middle-manager/v2/otherforadmin/querysensitivepage`, obj);
  }
  getAsenList(obj) {
    return this.http.post<any>(`/middle-manager/v2/otherforadmin/querysensitiveword`, obj);
  }
  addSenWord(obj) {
    return this.http.post<any>(`/middle-manager/v2/otherforadmin/addsensitiveword`, obj);
  }
  delSenWord(obj) {
    return this.http.post<any>(`/middle-manager/v2/otherforadmin/deletesensitiveword`, obj);
  }
  addNewRoute(obj) {
    return this.http.post<any>(`/middle-manager/v2/gatewayrouteforadmin/saveRoute`, obj);
  }
  delLog(id) {
    return this.http.delete<any>(`/middle-manager/v2/busioperlogsforadmin/deleteLog/${id}`);
  }
  delRoute(id) {
    return this.http.delete<any>(`/middle-manager/v2/gatewayrouteforadmin/deleteRoute/${id}`);
  }
  updateRoute(obj) {
    return this.http.post<any>(`/middle-manager/v2/gatewayrouteforadmin/updateRoute`, obj);
  }
}
