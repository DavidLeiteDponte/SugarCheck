import { Result } from '../../../shared/result';
import { ThresholdInvalidError } from '../errors/ThresholdInvalidError';

interface ThresholdsInterface {
  hypo: number;
  hiper: number;
}

export class Thresholds {
  public readonly value: ThresholdsInterface;

  private constructor(value: ThresholdsInterface) {
    // Inicializamos el objeto completo para evitar errores de referencia
    this.value = {
      hypo: value.hypo,
      hiper: value.hiper
    };
  }

  public static create(
    value: ThresholdsInterface,
  ): Result<Thresholds, ThresholdInvalidError> {
    
    // 1. Validar que el objeto exista
    if (!value) {
      return Result.fail(
        new ThresholdInvalidError('Los valores de umbral son requeridos'),
      );
    }

    // 2. Validar reglas de negocio (numéricas)
    if (value.hypo <= 0 || value.hiper <= 0) {
      return Result.fail(
        new ThresholdInvalidError('Los umbrales deben ser mayores a cero'),
      );
    }

    if (value.hypo >= value.hiper) {
      return Result.fail(
        new ThresholdInvalidError('El umbral de hipo debe ser menor al de híper'),
      );
    }

    return Result.ok(new Thresholds(value));
  }
}