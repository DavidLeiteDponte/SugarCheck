import { ErrorAbstract } from "../../../shared/error-abstract";

// Error para umbrales fuera de rango o inválidos
export class ThresholdInvalidError extends ErrorAbstract {
  constructor(message: string = 'El umbral proporcionado no es válido') {
    super(message);
  }
}