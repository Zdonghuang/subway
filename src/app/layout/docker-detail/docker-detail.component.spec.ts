import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DockerDetailComponent } from './docker-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('DockerDetailComponent', () => {
  let component: DockerDetailComponent;
  let fixture: ComponentFixture<DockerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgbModule, RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ DockerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
