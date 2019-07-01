import { LeapServicesModule } from './leap-services.module';

describe('LeapServicesModule', () => {
  let leapServicesModule: LeapServicesModule;

  beforeEach(() => {
    leapServicesModule = new LeapServicesModule();
  });

  it('should create an instance', () => {
    expect(leapServicesModule).toBeTruthy();
  });
});
