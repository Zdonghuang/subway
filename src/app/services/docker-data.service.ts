import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DockerContainer } from '../model/docker-container';
import { ContainerDetail } from '../model/container-detail';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DockerDataService {

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.settingsService.getSettings().dockerRemoteApiUrl + '/containers/json?all=1');
  }

  getContainerById(id: string): Observable<any> {
    return this.http.get<any>(this.settingsService.getSettings().dockerRemoteApiUrl + '/containers/' + id + '/json');
  }

  getStdoutById(id: string): Observable<string> {
    return this.http.get(this.settingsService.getSettings()
      .dockerRemoteApiUrl + '/containers/' + id + '/logs?stderr=0&stdout=1&tail=2000&timestamps=0',
      {observe: 'body', responseType: 'text'});
  }

  getStderrById(id: string): Observable<string> {
    return this.http.get(this.settingsService.getSettings()
      .dockerRemoteApiUrl + '/containers/' + id + '/logs?stderr=1&stdout=0&tail=2000&timestamps=0',
      {observe: 'body', responseType: 'text'});
  }

  startContainer(containerId: string): Observable<any> {
    return this.http.post<any>(
      this.settingsService.getSettings().dockerRemoteApiUrl + '/containers/' + containerId + '/start', null);
  }

  stopContainer(containerId: string): Observable<any> {
    const content = { id : containerId };
    return this.http.post<any>(
      this.settingsService.getSettings().dockerRemoteApiUrl + '/containers/' + containerId + '/stop?t=5', content);
  }

  killContainer(containerId: string): Observable<any> {
    const content = { id : containerId };
    return this.http.post<any>(
      this.settingsService.getSettings().dockerRemoteApiUrl + '/containers/' + containerId + '/kill', content);
  }

  restartContainer(containerId: string): Observable<any> {
    const content = { id : containerId };
    return this.http.post<any>(
      this.settingsService.getSettings().dockerRemoteApiUrl + '/containers/' + containerId + '/restart?t=5', content);
  }
}
