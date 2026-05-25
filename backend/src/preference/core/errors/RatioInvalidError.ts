import { ErrorAbstract } from "../../../shared/error-abstract";

// Error para ratios (proporciones) que no cumplen las reglas de negocio
export class RatioInvalidError extends ErrorAbstract {
  constructor(message: string = 'El ratio proporcionado no es válido') {
    super(message);
  }
}