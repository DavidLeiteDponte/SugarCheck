import { ErrorAbstract } from '../../../shared/error-abstract';
import { Result } from '../../../shared/result';
import { User } from '../../../user/core/User';

export interface GetOneByIdInterface {
  run(data: { id: string }): Promise<Result<User, ErrorAbstract>>;
}
