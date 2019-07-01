import { UserDashboardModule } from './user-dashboard.module';

describe('UserDashboardModule', () => {
    let chartsModule: UserDashboardModule;

    beforeEach(() => {
        chartsModule = new UserDashboardModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
