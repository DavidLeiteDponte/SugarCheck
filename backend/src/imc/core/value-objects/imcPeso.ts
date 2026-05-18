import { Result } from "../../../shared/result";
import { PesoNotValid } from "../errors/PesoNotValid"; // Asegúrate de tener este error creado

export class ImcPeso {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): Result<ImcPeso, PesoNotValid> {
    // 1. Validación de tipo y existencia
    if (typeof value !== 'number' || isNaN(value)) {
      return Result.fail(new PesoNotValid('El peso debe ser un valor numérico'));
    }

    // 2. Validación de rango lógico (en kg)
    // Rango sugerido: 2kg (bebé) hasta 500kg
    const MIN_PESO = 2;
    const MAX_PESO = 500;

    if (value < MIN_PESO || value > MAX_PESO) {
      return Result.fail(
        new PesoNotValid(`El peso debe estar entre ${MIN_PESO}kg y ${MAX_PESO}kg`)
      );
    }

    return Result.ok(new ImcPeso(value));
  }
}