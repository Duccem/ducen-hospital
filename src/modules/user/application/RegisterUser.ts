import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class RegisterUser {
  constructor(private repository: UserRepository) {}
  async run(id: string, externalId: string, email: string, role: string) {
    const user = User.Create(id, externalId, email, role);
    await this.repository.save(user);
  }
}
