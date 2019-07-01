import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BackendGitComponent } from './backEnd-git.component';
import { BackendGitModule } from './backEnd-git.module';

describe('BackendGitComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BackendGitModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(BackendGitComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
