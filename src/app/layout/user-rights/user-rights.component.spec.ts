import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core'
import { UserRightsComponent } from './user-rights.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserRightsComponent', () => {
  let component: UserRightsComponent;
  let fixture: ComponentFixture<UserRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [ UserRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
