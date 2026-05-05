import { Result } from '../../../shared/result';
import { RatioInvalidError } from '../errors/RatioInvalidError';

interface InsulinRatiosProps {
  breakfast: number;
  lunch: number;
  dinner: number;
}

export class InsulinRatios {
  public readonly breakfast: number;
  public readonly lunch: number;
  public readonly dinner: number;

  private constructor(props: InsulinRatiosProps) {
    this.breakfast = props.breakfast;
    this.lunch = props.lunch;
    this.dinner = props.dinner;
  }

  public static create(
    b: number,
    l: number,
    d: number
  ): Result<InsulinRatios, RatioInvalidError> {
    
    // 1. Validar que todos los ratios sean números positivos
    if (b <= 0 || l <= 0 || d <= 0) {
      return Result.fail(
        new RatioInvalidError('Los ratios de insulina deben ser mayores a cero'),
      );
    }

    // 2. Opcional: Validar que no sean nulos (NaN check)
    if (isNaN(b) || isNaN(l) || isNaN(d)) {
      return Result.fail(
        new RatioInvalidError('Los ratios deben ser valores numéricos válidos'),
      );
    }

    return Result.ok(new InsulinRatios({ breakfast: b, lunch: l, dinner: d }));
  }
}