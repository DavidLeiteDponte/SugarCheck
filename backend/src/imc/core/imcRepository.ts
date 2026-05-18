// src/imc/domain/repositories/ImcRepository.ts
import { Imc } from "./imc";
import { UserId } from "../../user/core/value-objects/UserId";

export interface ImcRepository {
  save(imc: Imc): Promise<void>;
  findByUserId(userId: UserId): Promise<Imc[]>;
  findLatestByUserId(userId: UserId): Promise<Imc | null>;
}