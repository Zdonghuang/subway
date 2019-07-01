import { Injectable } from '@angular/core';
import { SubwaySettings } from '../model/subway-settings';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getSettings(): SubwaySettings {
    const settings: SubwaySettings = new SubwaySettings;
    settings.dockerRemoteApiUrl = localStorage.getItem('dockerRemoteApiUrl') || 'https://api.ileapcloud.com/docker';

    const defaultJson = `    [
      ["devcenter_server", "devcenter前端"],
      ["UserManager_Server", "UserManager"],
      ["Gateway_Zuul", "Gateway"],
      ["Config_Server", "Config"],
      ["Eureka_Server", "Eureka注册中心"],
      ["leapai-forum", "论坛对接后台程序"],
      ["leapai-sms", "短信后台"],
      ["subway", "中台"],
      ["graphic-verify", "图形验证码"],
      ["icemaker_server", "icemaker前端"],
      ["Map_app", "地图后台"],
      ["mysql_server", "mysql"],
      ["jovial_lichterman", "docker 界面"],
      ["Static-Resources", "静态资源"],
      ["mail", "邮件"],
      ["leez_lenovo", "leez"],
      ["dss_server", "dss server"],
      ["ileapcloud_leez", "ileapcloud - leez"],
      ["user_center", "User Center"],
      ["MiddleManager_Server", "Middle Manager Server"],
      ["commerceiot_server", "Commerce IoT Server"],
      ["huginn_api", "Huginn"],
      ["scep_server", "SCEP Server"],
      ["oauth_server", "OAuth Server"],
      ["ileapcloud_jdwx", "ileapcloud - jdwx"],
      ["jingdong_api", "jingdong"]
    ]`;

    settings.leapServicesJson = localStorage.getItem('leapServicesJson') || defaultJson;
    return settings;
  }

  public setDockerRemoteApiUrl(url: string): void {
    localStorage.setItem('dockerRemoteApiUrl', url);
  }

  public setLeapServicesJson(json: string): void {
    localStorage.setItem('leapServicesJson', json);
  }

  public getApiBaseUrl(): string {
    return localStorage.getItem('apiBaseUrl') || environment.apiUrl;
  }

  public setApiBaseUrl(url: string) {
    localStorage.setItem('apiBaseUrl', url);
  }
}
