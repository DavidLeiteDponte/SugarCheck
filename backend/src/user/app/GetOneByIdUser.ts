import { UserRepository } from '../core/UserRepository';
import { User } from '../core/User';
import { Result } from '../../shared/result';
import { ErrorAbstract } from '../../shared/error-abstract';
import { UserId } from '../../shared/core/value-objects/UserId';

export class GetOneByIdUser {
  constructor(private readonly repository: UserRepository) {}

  public async run(data: { id: string }): Promise<Result<User, ErrorAbstract>> {
    const userIdResult = UserId.create(data.id);

    if (!userIdResult.isValid) {
      return Result.fail(userIdResult.getError());
    }

    const userId = userIdResult.getValue();

    return await this.repository.getOneById(userId);
  }
}
