import { ErrorAbstract } from '../../../shared/error-abstract';

// Error para unidades de configuración no válidas
export class ConfigUnitInvalidError extends ErrorAbstract {
  constructor(
    message: string = 'La unidad de configuración proporcionada no es válida',
  ) {
    super(message);
  }
}
