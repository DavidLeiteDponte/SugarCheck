import { UserId } from '../../../src/shared/core/value-objects/UserId';
import { ErrorAbstract } from '../../../src/shared/error-abstract';
import { Result } from '../../../src/shared/result';
import { UserNotFoundError } from '../../../src/user/core/errors/UserNotFoundError';
import { User } from '../../../src/user/core/User';
import { UserRepository } from '../../../src/user/core/UserRepository';
import { UserEmail } from '../../../src/user/core/value-objects/UserEmail';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getAll(): Promise<Result<User[], ErrorAbstract>> {
    if (this.users.length <= 0) {
      return Result.fail(new UserNotFoundError('No hay usuarios'));
    }
    return Result.ok(this.users);
  }

  async getOneByEmail(email: UserEmail): Promise<Result<User, ErrorAbstract>> {
    const user = this.users.find((u) => u.email.value === email.value);
    if (!user) {
      return Result.fail(
        new UserNotFoundError(`Usuario con email ${email.value} no encontrado`),
      );
    }
    return Result.ok(user);
  }

  async getOneById(id: UserId): Promise<Result<User, ErrorAbstract>> {
    const user = this.users.find((u) => u.id.value === id.value);
    if (!user) {
      return Result.fail(
        new UserNotFoundError(`Usuario con ID ${id.value} no encontrado`),
      );
    }
    return Result.ok(user);
  }

  async save(user: User): Promise<Result<User, ErrorAbstract>> {
    const index = this.users.findIndex((u) => u.id.value === user.id.value);

    if (index !== -1) {
      // Update
      this.users[index] = user;
    } else {
      // Create
      this.users.push(user);
    }

    return Result.ok(user);
  }

  async delete(id: UserId): Promise<Result<void, ErrorAbstract>> {
    const index = this.users.findIndex((u) => u.id.value === id.value);

    if (index === -1) {
      return Result.fail(
        new UserNotFoundError('No se pudo eliminar: usuario no existe'),
      );
    }

    this.users.splice(index, 1);
    return Result.ok(undefined);
  }

  // Método auxiliar para limpiar el estado entre tests
  public clear(): void {
    this.users = [];
  }
}
