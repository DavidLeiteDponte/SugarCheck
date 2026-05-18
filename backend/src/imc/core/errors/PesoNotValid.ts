import { ErrorAbstract } from "../../../shared/error-abstract";

export class PesoNotValid extends ErrorAbstract{
    constructor(message: string) {
    super(message);
  }
}