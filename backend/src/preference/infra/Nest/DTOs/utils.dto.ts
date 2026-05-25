import { IsNotEmpty, IsNumber } from 'class-validator';

export class ThresholdsDTO {
  @IsNumber({}, { message: 'El umbral de hipoglucemia debe ser un número' })
  @IsNotEmpty({ message: 'El umbral de hipoglucemia es obligatorio' })
  hypo!: number;

  @IsNumber({}, { message: 'El umbral de hiperglucemia debe ser un número' })
  @IsNotEmpty({ message: 'El umbral de hiperglucemia es obligatorio' })
  hiper!: number;
}

export class InsulinRatiosDTO {
  @IsNumber({}, { message: 'El ratio del desayuno debe ser un número' })
  @IsNotEmpty({ message: 'El ratio del desayuno es obligatorio' })
  breakfast!: number;

  @IsNumber({}, { message: 'El ratio del almuerzo debe ser un número' })
  @IsNotEmpty({ message: 'El ratio del almuerzo es obligatorio' })
  lunch!: number;

  @IsNumber({}, { message: 'El ratio de la cena debe ser un número' })
  @IsNotEmpty({ message: 'El ratio de la cena es obligatorio' })
  dinner!: number;
}
