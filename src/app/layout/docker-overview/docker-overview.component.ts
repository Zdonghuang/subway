import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DockerDataService } from '../../services/docker-data.service';
import { DockerContainer } from '../../model/docker-container';

@Component({
  selector: 'app-docker-overview',
  templateUrl: './docker-overview.component.html',
  styleUrls: ['./docker-overview.component.scss'],
  animations: [routerTransition()]
})
export class DockerOverviewComponent implements OnInit {
  busy = false;
  containers: DockerContainer[] = [];

  // Doughnut
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  public stateClassGreen = 'badge badge-success badge-pill';
  public stateClassDark = 'badge badge-dark badge-pill';
  public stateFilter = 'running';

  public donutColors = [
      {
        backgroundColor: [
        'rgba(40, 167, 69, 1)',
        'rgba(220, 53, 69, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(23, 162, 184, 1)',
        'rgba(108, 117, 125, 1)',
        'rgba(0, 123, 255, 1)',
        'rgba(129, 78, 40, 1)'
        ]
      }
    ];

  // events
  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);

      if ( activePoints.length > 0) {
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];

        this.stateFilter = label;
      }
    }
  }

  public chartFilter(state: string): boolean {
    if ( state === this.stateFilter) {
      return true;
    }

    if (this.stateFilter === 'other') {
      if (state !== 'running'
          && state !== 'dead'
          && state !== 'exited'
          && state !== 'created'
          && state !== 'restarting') {
        return true;
      }
    }

    return false;
  }

  public stateClass(state: string): string {
    if (state === 'running') {
      return 'badge badge-success badge-pill';
    } else if (state === 'exited') {
      return 'badge badge-warning badge-pill';
    } else if (state === 'dead') {
      return 'badge badge-danger badge-pill';
    } else if (state === 'created') {
      return 'badge badge-info badge-pill';
    } else if (state === 'restarting') {
      return 'badge badge-secondary badge-pill';
    } else if (state === 'other') {
      return 'badge badge-dark badge-pill';
    }
  }

  constructor(private dockerDataService: DockerDataService) {
  }

  ngOnInit() {
    this.busy = true;
    this.dockerDataService.getAll()
      .subscribe((data: any[]) => {
        this.containers.length = 0;
        this.doughnutChartLabels.length = 0;
        this.doughnutChartData.length = 0;

        const map = new Map;
        for (const con of data) {
          const container = new DockerContainer(con.Id, con.Names[0].slice(1), con.Command, con.State, con.Status);
          this.containers.push(container);

          if (map.has(container.state)) {
            map.set(container.state, map.get(container.state) + 1);
          } else {
            map.set(container.state, 1);
          }
        }

        let i = 0;
        let pos = 0;
        map.forEach((count, label) => {
          if (label === 'running') {
            this.doughnutChartLabels.push(label);
            this.doughnutChartData.push(count);
            this.donutColors[0].backgroundColor[i] = 'rgba(40, 167, 69, 1)';
          } else if (label === 'exited') {
            this.doughnutChartLabels.push(label);
            this.doughnutChartData.push(count);
            this.donutColors[0].backgroundColor[i] = 'rgba(255, 193, 7, 1)';
          } else if (label === 'dead') {
            this.doughnutChartLabels.push(label);
            this.doughnutChartData.push(count);
            this.donutColors[0].backgroundColor[i] = 'rgba(220, 53, 69, 1)';
          } else if (label === 'created') {
            this.doughnutChartLabels.push(label);
            this.doughnutChartData.push(count);
            this.donutColors[0].backgroundColor[i] = 'rgba(23, 162, 184, 1)';
          } else if (label === 'restarting') {
            this.doughnutChartLabels.push(label);
            this.doughnutChartData.push(count);
            this.donutColors[0].backgroundColor[i] = 'rgba(108, 117, 125, 1)';
          } else {
            if (!this.doughnutChartLabels.find(v => v === 'other')) {
              this.doughnutChartLabels.push('Other');
              pos = i;
            }
            this.doughnutChartData[pos] = this.doughnutChartData[pos] + count;
            this.donutColors[0].backgroundColor[i] = 'rgba(52, 58, 64, 1)';
          }

          i++;
        });

        this.busy = false;
      });
  }
}
