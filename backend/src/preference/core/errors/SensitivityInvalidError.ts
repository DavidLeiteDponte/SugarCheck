import { ErrorAbstract } from "../../../shared/error-abstract";

// Error para valores de sensibilidad incorrectos
export class SensitivityInvalidError extends ErrorAbstract {
  constructor(message: string = 'La sensibilidad proporcionada no es válida') {
    super(message);
  }
}
