import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DockerDataService } from '../../services/docker-data.service';
import { SettingsService } from '../../services/settings.service';
import { DockerContainer } from '../../model/docker-container';

@Component({
  selector: 'app-leap-services',
  templateUrl: './leap-services.component.html',
  styleUrls: ['./leap-services.component.scss'],
  animations: [routerTransition()]
})
export class LeapServicesComponent implements OnInit {
  busy = false;
  containers: DockerContainer[] = [];

  // serviceMap = new Map([
  //   ['devcenter_server', 'devcenter前端'],
  //   ['UserManager_Server', 'UserManager'],
  //   ['Gateway_Zuul', 'Gateway'],
  //   ['Config_Server', 'Config'],
  //   ['Eureka_Server', 'Eureka注册中心'],
  //   ['leapai-forum', '论坛对接后台程序'],
  //   ['leapai-sms', '短信后台'],
  //   ['subway', '中台'],
  //   ['graphic-verify', '图形验证码'],
  //   ['icemaker_server', 'icemaker前端'],
  //   ['Map_app', '地图后台'],
  //   ['mysql_server', 'mysql'],
  //   ['jovial_lichterman', 'docker 界面'],
  //   ['Static-Resources', '静态资源'],
  //   ['mail', '邮件']
  // ]);

  serviceMap = new Map();

  constructor(private dockerDataService: DockerDataService, private settingsService: SettingsService) {
  }

  mapToObj(map) {
    const obj = Object.create(null);
    for (const [k, v] of map) {
      obj[k] = v;
    }
    return obj;
  }

  ngOnInit() {
    this.busy = true;

    this.serviceMap = new Map(JSON.parse(this.settingsService.getSettings().leapServicesJson));

    this.dockerDataService.getAll()
      .subscribe((data: any[]) => {
        this.containers.length = 0;
        data.forEach(con => {
          const name = con.Names[0].slice(1);
          if (this.serviceMap.has(name)) {
            this.containers.push(new DockerContainer(con.Id, this.serviceMap.get(name), con.Command, con.State, con.Status));
          }
        });

        this.busy = false;
      });
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
}
