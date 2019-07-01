import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SettingsService } from '../../services/settings.service';
import { FormControl } from '@angular/forms';
import { SettingService } from './settings.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [routerTransition()]
})
export class SettingsComponent implements OnInit {
  apiBaseUrl = new FormControl('');
  dockerRemoteApiUrl = new FormControl('');
  leapServicesJson = new FormControl('');
  domain;
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  modifydomain;
  constructor(private settingsService: SettingsService, public router: Router, private http: SettingService) { }

  ngOnInit() {
    this.apiBaseUrl.setValue( this.settingsService.getApiBaseUrl() );
    this.dockerRemoteApiUrl.setValue( this.settingsService.getSettings().dockerRemoteApiUrl );
    this.leapServicesJson.setValue( this.settingsService.getSettings().leapServicesJson );
    this.getdomain();
  }
  getdomain() {
    this.http.getDomainInfoList()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.domain = res.result;
      }
    });
  }
  setdomain(e) {
    this.modifydomain = e;
  }
  onApply() {
    this.settingsService.setApiBaseUrl(this.apiBaseUrl.value);
    this.settingsService.setDockerRemoteApiUrl(this.dockerRemoteApiUrl.value);
    this.settingsService.setLeapServicesJson(this.leapServicesJson.value);
    this.domain.filter(item => {
      if (item.domainFullName === this.modifydomain) {
        localStorage.setItem('leap', item.domainFullName);
        localStorage.setItem('domain', item.domainShortName);
      }
    });
    this.router.navigate(['/login']);
  }
}
