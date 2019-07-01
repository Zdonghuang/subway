import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardModule } from './user-dashboard.module';
import { TranslateModule } from '@ngx-translate/core';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          UserDashboardModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          HttpClientTestingModule,
          TranslateModule.forRoot(),
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
