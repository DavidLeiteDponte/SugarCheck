import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Inject,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SavePreference } from '../../app/SavePreference';
import { UpdatePreference } from '../../app/UpdatePreference';
import { CreatePreferenceDTO } from './DTOs/create-performance.dto';
import { UpdatePreferenceDTO } from './DTOs/update-preference.dto';
import { GetOneByIdPreference } from '../../app/GetOneByUserIdPreference';
import { FindUserIdDTO } from '../../../shared/infrastructure/DTOs/find-user-id.dto';

@Controller('preference')
export class PreferenceController {
  constructor(
    @Inject('GetOneByIdPreference')
    private readonly getOneByIdPreferenceUseCase: GetOneByIdPreference,
    @Inject('SavePreference')
    private readonly savePreferenceUseCase: SavePreference,
    @Inject('UpdatePreference')
    private readonly updatePreferenceUseCase: UpdatePreference,
  ) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getOneById(@Param('id') id: FindUserIdDTO) {
    const result = await this.getOneByIdPreferenceUseCase.run(id);

    if (!result.isValid) {
      throw new HttpException(
        result.getError().message,
        HttpStatus.NOT_FOUND, // 404 es el código HTTP semánticamente correcto aquí
      );
    }

    return {
      message: 'Preferencias obtenidas exitosamente',
      data: result.getValue(),
    };
  }

  @Post()
  async create(@Body() body: CreatePreferenceDTO) {
    const result = await this.savePreferenceUseCase.run(
      body.userId,
      body.unitMeasure,
      body.thresholds,
      body.insulinRatios,
      body.sensitivity,
    );

    // Si la validación de los Value Objects falla, retornamos un 400 Bad Request
    if (!result.isValid) {
      throw new HttpException(
        result.getError().message,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Retornamos el valor mapeado o directamente la entidad (NestJS la serializa a JSON)
    return {
      message: 'Preferencias guardadas exitosamente',
      data: result.getValue(),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePreferenceDTO) {
    const result = await this.updatePreferenceUseCase.run(id, body);

    if (!result.isValid) {
      throw new HttpException(
        result.getError().message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Preferencias actualizadas exitosamente',
      data: result.getValue(),
    };
  }
}
