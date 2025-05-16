import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";

export class FakeUserRepository implements UserRepository {
    private users: User[] = [
        new User('111', 'John Doe'),
        new User('222', 'Jane Smith'),
    ];

    public async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.getId() === id);

        if (!user) {
            return null;
        }

        return user;
    }

    public async save(user: User): Promise<void> {
        this.users.push(user);
    }
}
