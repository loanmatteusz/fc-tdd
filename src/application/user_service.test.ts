import { UserService } from './user_service';
import { FakeUserRepository } from '../infrastructure/repositories/fake_user_repository';
import { User } from '../domain/entities/user';

describe('UserService', () => {
    let globalUser: User;
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;

    beforeEach(() => {
        globalUser = new User('333', 'Leon');
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

    it('Should save an user using a fake repository and finding again', async () => {
        await fakeUserRepository.save(globalUser);
        const user = await userService.findById('333');
        expect(user?.getId()).toBe(globalUser.getId());
    });
});
