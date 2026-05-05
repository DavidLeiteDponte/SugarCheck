import { UserId } from "../../shared/core/value-objects/UserId";
import { ErrorAbstract } from "../../shared/error-abstract";
import { Result } from "../../shared/result";
import { Preference } from "../core/Preference";
import { PreferenceRepository } from "../core/PreferenceRepository";

export class GetOneByIdPreference {
  constructor(private readonly repository: PreferenceRepository) {}

  public async run(data: { id: string }): Promise<Result<Preference, ErrorAbstract>> {
    const userIdResult = UserId.create(data.id);

    if (!userIdResult.isValid) {
      return Result.fail(userIdResult.getError());
    }

    const userId = userIdResult.getValue();

    return await this.repository.getOneById(userId);
  }
}
