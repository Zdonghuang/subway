import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
  constructor(private http: HttpClient) { }

  getData(time, day) {
    return this.http.get<any>(`/middle-manager/v2/dashboardforadmin/getUserLineChartData/${time}/${day}`);
  }
  getDatas(time, day) {
    return this.http.get<any>(`/middle-manager/v2/dashboardforadmin/getUserLineChartData/${time}/${day}`);
  }
}
