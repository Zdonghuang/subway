import { BackendGitModule } from './backEnd-git.module';

describe('BackendGitModule', () => {
  let backendGitModule: BackendGitModule;

  beforeEach(() => {
      backendGitModule = new BackendGitModule();
  });

  it('should create an instance', () => {
    expect(BackendGitModule).toBeTruthy();
  });
});
