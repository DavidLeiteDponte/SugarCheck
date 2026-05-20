import { User } from './User';
import { UserEmail } from './value-objects/UserEmail';
import { ErrorAbstract } from '../../shared/error-abstract';
import { Result } from '../../shared/result';
import { UserId } from '../../shared/core/value-objects/UserId';

export interface UserRepository {
  getAll(): Promise<Result<User[], ErrorAbstract>>;

  getOneById(id: UserId): Promise<Result<User, ErrorAbstract>>;

  getOneByEmail(email: UserEmail): Promise<Result<User, ErrorAbstract>>;

  save(user: User): Promise<Result<User, ErrorAbstract>>;

  update(id: UserId, update: Partial<User>): Promise<Result<User, ErrorAbstract>>;

  delete(id: UserId): Promise<Result<void, ErrorAbstract>>;
}
