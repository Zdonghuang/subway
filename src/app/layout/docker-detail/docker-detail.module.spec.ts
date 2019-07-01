import { DockerDetailModule } from './docker-detail.module';

describe('DockerDetailModule', () => {
  let dockerDetailModule: DockerDetailModule;

  beforeEach(() => {
    dockerDetailModule = new DockerDetailModule();
  });

  it('should create an instance', () => {
    expect(dockerDetailModule).toBeTruthy();
  });
});
