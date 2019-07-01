import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DeviceService } from '../../services/device.service';
@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss'],
    animations: [routerTransition()]
})
export class DeviceComponent implements OnInit {
    page = 1;
    deviceList;
    deviceInfo = false;
    adevice;
    constructor(public http: DeviceService) {}

    ngOnInit() {
      this.getDeviceList();
    }

    getDeviceList() {
      this.http.getDeviceList(this.page).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.deviceList = res.result.payload;
        }
      });
    }
    del(id, model) {
      if (confirm(`确定要删除${model}吗`)) {
        this.http.delDevice(id).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.getDeviceList();
          }
        });
      }
    }
    getadevice() {
      this.http.getAdevice(this.adevice).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.adevice = res.result;
        }
        console.log(this.adevice);
      });
    }
}
