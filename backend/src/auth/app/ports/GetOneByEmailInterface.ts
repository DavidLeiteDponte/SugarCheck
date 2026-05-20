import { ErrorAbstract } from '../../../shared/error-abstract';
import { Result } from '../../../shared/result';
import { User } from '../../../user/core/User';

export interface GetOneByEmailInterface {
  run(data: { email: string }): Promise<Result<User, ErrorAbstract>>;
}
