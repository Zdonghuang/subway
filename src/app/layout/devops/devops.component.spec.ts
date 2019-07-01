import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DevopsComponent } from './devops.component';
import { FormsModule } from '@angular/forms';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

describe('DevopsComponent', () => {
  let component: DevopsComponent;
  let fixture: ComponentFixture<DevopsComponent>;
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
      ],
      declarations: [ DevopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
