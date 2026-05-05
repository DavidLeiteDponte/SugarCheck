import { ErrorAbstract } from '../../error-abstract';

// 1. Error específico para IDs
export class UserIdInvalidError extends ErrorAbstract {
  constructor(message: string = 'El ID proporcionado no es válido') {
    super(message);
  }
}
