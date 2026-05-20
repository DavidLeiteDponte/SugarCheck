import { UserId } from '../../shared/core/value-objects/UserId';
import { ErrorAbstract } from '../../shared/error-abstract';
import { Result } from '../../shared/result';
import { Preference } from './Preference';

export interface PreferenceRepository {
  getOneById(id: UserId): Promise<Result<Preference, ErrorAbstract>>;

  save(userConfig: Preference): Promise<Result<Preference, ErrorAbstract>>;

  update(
    id: UserId,
    userConfig: Partial<Preference>,
  ): Promise<Result<Preference, ErrorAbstract>>;
}
