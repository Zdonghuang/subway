import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Machine } from "./Machine";
import { Observable,Subscription } from 'rxjs';
import { IMqttMessage, MqttModule, MqttService,IMqttServiceOptions } from 'ngx-mqtt';

@Component({
  selector: 'app-devops',
  templateUrl: './devops.component.html',
  styleUrls: ['./devops.component.scss']
})

export class DevopsComponent implements OnInit {
  private subscription: Subscription;
  public message: string;
  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }
  devmachine: Machine = {
    title: '开发环境',
    tag: 'dev',
    ip: '172.71.171.206',
    jenkins: '',
    mqttpublish: '',
    mqttmessage: ''
  };
  testmachine: Machine = {
    title: '测试环境',
    tag: 'test',
    ip: '172.71.171.84',
    jenkins: '',
    mqttpublish: '',
    mqttmessage: ''
  };
  prodmachine: Machine = {
    title: '生产环境',
    tag: 'prod',
    ip: '223.202.108.16',
    jenkins: '',
    mqttpublish: '',
    mqttmessage: ''
  };
  containers;
  busy = false;
  constructor(private _mqttService: MqttService) { }
  ngOnInit() {
    this.subscription = this._mqttService.observe('Devops').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(this.message);
      this.devmachine.mqttmessage = this.message;
    });
  }
}
