import { ErrorAbstract } from "../../../shared/error-abstract";

export class AlturaNotValid extends ErrorAbstract{
    constructor(message: string) {
    super(message);
  }
}