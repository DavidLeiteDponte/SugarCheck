import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ThresholdsDTO, InsulinRatiosDTO } from './utils.dto';

export class CreatePreferenceDTO {
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  userId!: string;

  @IsString({ message: 'La unidad de medida debe ser un texto' })
  @IsNotEmpty({ message: 'La unidad de medida es obligatoria' })
  unitMeasure!: string;

  @ValidateNested({ message: 'Los umbrales tienen un formato incorrecto' })
  @Type(() => ThresholdsDTO) // Obligatorio para transformar el JSON a la clase
  @IsNotEmpty({ message: 'Los umbrales son obligatorios' })
  thresholds!: ThresholdsDTO;

  @ValidateNested({
    message: 'Los ratios de insulina tienen un formato incorrecto',
  })
  @Type(() => InsulinRatiosDTO)
  @IsNotEmpty({ message: 'Los ratios de insulina son obligatorios' })
  insulinRatios!: InsulinRatiosDTO;

  @IsNumber({}, { message: 'El factor de sensibilidad debe ser un número' })
  @IsNotEmpty({ message: 'El factor de sensibilidad es obligatorio' })
  sensitivity!: number;
}
