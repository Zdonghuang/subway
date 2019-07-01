import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceComponent } from './device.component';
import { DeviceModule } from './device.module';
import { TranslateModule } from '@ngx-translate/core';

describe('DeviceComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, DeviceModule, RouterTestingModule, TranslateModule.forRoot() ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(DeviceComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
