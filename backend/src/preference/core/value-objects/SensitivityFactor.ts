import { Result } from '../../../shared/result';
import { SensitivityInvalidError } from '../errors/SensitivityInvalidError';

export class SensitivityFactor {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(
    value: number,
  ): Result<SensitivityFactor, SensitivityInvalidError> {
    
    // 1. Validar que el valor sea un número y no sea nulo/undefined
    if (value === null || value === undefined) {
      return Result.fail(
        new SensitivityInvalidError('El factor de sensibilidad es requerido'),
      );
    }

    // 2. Regla de negocio: El factor de sensibilidad suele ser positivo
    if (value <= 0) {
      return Result.fail(
        new SensitivityInvalidError('El factor de sensibilidad debe ser mayor a cero'),
      );
    }

    return Result.ok(new SensitivityFactor(value));
  }
}