import { Result } from "../../../shared/result";
import { AlturaNotValid } from "../errors/AlturaNotValid";

export class ImcAltura {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): Result<ImcAltura, AlturaNotValid> {
    // 1. Validación de tipo
    if (typeof value !== 'number' || isNaN(value)) {
      return Result.fail(new AlturaNotValid('La altura debe ser un número válido'));
    }

    // 2. Validación de rango en centímetros (ejemplo: entre 50cm y 250cm)
    const MIN_CM = 50;
    const MAX_CM = 250;

    if (value < MIN_CM || value > MAX_CM) {
      return Result.fail(
        new AlturaNotValid(`La altura debe estar entre ${MIN_CM} y ${MAX_CM} centímetros`)
      );
    }

    // 3. Opcional: Asegurar que sea un número entero
    if (!Number.isInteger(value)) {
      return Result.fail(new AlturaNotValid('La altura en centímetros debe ser un número entero'));
    }

    return Result.ok(new ImcAltura(value));
  }

  // Helper útil: Si luego necesitas la altura en metros para la fórmula del IMC
  public toMeters(): number {
    return this.value / 100;
  }
}