import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserDashboardService } from './user-dashboard.service';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.scss'],
    animations: [routerTransition()]
})
export class UserDashboardComponent implements OnInit {
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  time = 'date';
  day = 7;
  date = '天';
  times = 'week';
  days = 4;
  dates = '周';
    // bar chart
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels = [];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData = [
        { data: [], label: '新增用户数量(个)'},
    ];
    // 线装图
    public lineChartData = [
      { data: [], label: '用户增长比例(%)' }
    ];
    public lineChartLabels = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';

    constructor(private http: UserDashboardService) {}

    ngOnInit() {
      this.getdata();
      this.getdatas();
    }
    getdata() {
      this.http.getData(this.time, this.day)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.lineChartLabels = [];
          this.lineChartData[0].data = [];
          res.result.filter(item => {
            this.lineChartLabels.push(item.chartLabel);
            this.lineChartData[0].data.push(`${item.chartData}`);
          });
        }
      });
    }
    getdatas() {
      this.http.getDatas(this.times, this.days)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.barChartLabels = [];
          this.barChartData[0].data = [];
          res.result.filter(item => {
            this.barChartLabels.push(item.chartLabel);
            this.barChartData[0].data.push(`${item.chartData}`);
          });
        }
      });
    }
    settime(e, num, event) {
      if (num === 1) {
        console.dir(event.target);
        this.times = e;
        if (e === 'date') {
          this.dates = '天';
        } else if (e === 'week') {
          this.dates = '周';
        } else if (e === 'month') {
          this.dates = '月';
        } else if (e === 'quarter') {
          this.dates = '季';
        } else if (e === 'year') {
          this.dates = '年';
        }
        this.getdatas();
      } else if (num === 2) {
        this.time = e;
        if (e === 'date') {
          this.date = '天';
        } else if (e === 'week') {
          this.date = '周';
        } else if (e === 'month') {
          this.date = '月';
        } else if (e === 'quarter') {
          this.date = '季';
        } else if (e === 'year') {
          this.date = '年';
        }
        this.getdata();
      }
    }
    setdate(e, num) {
      if (num === 1 && Number(e) > 0) {
        this.days = Number(e);
        this.getdatas();
      } else if (num === 2 && Number(e) > 0) {
        this.day = Number(e);
        this.getdata();
      }
    }
}
