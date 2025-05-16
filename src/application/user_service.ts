import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/user_repository";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async findById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}
