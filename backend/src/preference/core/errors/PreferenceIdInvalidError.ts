import { ErrorAbstract } from "../../../shared/error-abstract";

// Error para ratios (proporciones) que no cumplen las reglas de negocio
export class PreferenceIdInvalidError extends ErrorAbstract {
  constructor(message: string = 'El id proporcionado no es válido') {
    super(message);
  }
}