import { Result } from '../../../shared/result';
import { ConfigUnitInvalidError } from '../errors/ConfigUnitInvalidErorr';

export class UnitMeasure {
  // Nota: corregido 'md/dL' por 'mg/dL' que es el estándar médico
  public readonly value: 'mg/dL' | 'mmol/L';

  private constructor(value: 'mg/dL' | 'mmol/L') {
    this.value = value;
  }

  public static create(
    value: string,
  ): Result<UnitMeasure, ConfigUnitInvalidError> {
    const cleanValue = value.trim();

    // Usamos un array de permitidos para que la validación sea más limpia
    const allowedUnits = ['mg/dL', 'mmol/L'];

    if (!allowedUnits.includes(cleanValue)) {
      return Result.fail(new ConfigUnitInvalidError(
        `La unidad '${cleanValue}' no es válida. Use: ${allowedUnits.join(' o ')}`
      ));
    }

    // Usamos "as" para asegurar a TS que el string ya fue validado
    return Result.ok(new UnitMeasure(cleanValue as 'mg/dL' | 'mmol/L'));
  }
}