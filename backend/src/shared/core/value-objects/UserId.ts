import { Result } from '../../result';
import { UserIdInvalidError } from '../errors/UserIdInvalidError';

export class UserId {
  public readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Result<UserId, UserIdInvalidError> {
    if (!value || value.trim().length === 0) {
      return Result.fail(new UserIdInvalidError('El ID no puede estar vacío'));
    }

    return Result.ok(new UserId(value.trim()));
  }
}
