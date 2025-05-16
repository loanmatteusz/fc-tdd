import { UserService } from './user_service';
import { FakeUserRepository } from '../infrastructure/repositories/fake_user_repository';

describe('UserService', () => {
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
    });

    it('Should return null when an invalid ID is passed', async () => {
        const user = await userService.findById('1');
        expect(user).toBe(null);
    });

    it('Should return User when an valid ID is passed', async () => {
        const user = await userService.findById('111');
        expect(user).not.toBeNull();
        expect(user?.getId()).toBe('111');
    });
});
