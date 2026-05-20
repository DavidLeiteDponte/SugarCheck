import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { InsulinRatiosDTO, ThresholdsDTO } from "./utils.dto";

export class UpdatePreferenceDTO {
  @IsString({ message: 'La unidad de medida debe ser un texto' })
  @IsOptional()
  unitMeasure?: string;

  @ValidateNested({ message: 'Los umbrales tienen un formato incorrecto' })
  @Type(() => ThresholdsDTO)
  @IsOptional()
  thresholds?: ThresholdsDTO;

  @ValidateNested({ message: 'Los ratios de insulina tienen un formato incorrecto' })
  @Type(() => InsulinRatiosDTO)
  @IsOptional()
  insulinRatios?: InsulinRatiosDTO;

  @IsNumber({}, { message: 'El factor de sensibilidad debe ser un número' })
  @IsOptional()
  sensitivity?: number;
}