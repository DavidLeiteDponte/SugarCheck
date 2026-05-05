import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetAllUser } from '../../app/GetAllUser';
import { DeleteUser } from '../../app/DeleteUser';
import { GetOneByIdUser } from '../../app/GetOneByIdUser';
import { GetOneByEmailUser } from '../../app/GetOneByEmailUser';
import { SaveUser } from '../../app/SaveUser';
import { UserAlreadyExists } from '../../core/errors/UserAlreadyExists';
import { ErrorAbstract } from '../../../shared/error-abstract';
import { UserNotFoundError } from '../../core/errors/UserNotFoundError';
import { FindUserIdDTO } from '../../../shared/infrastructure/DTOs/find-user-id.dto';
import { FindUserEmailDTO } from './DTOs/find-user-email.dto';
import { CreateUserDTO } from './DTOs/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject('GetAllUser') private readonly getAllUser: GetAllUser,
    @Inject('DeleteUser') private readonly deleteUser: DeleteUser,
    @Inject('GetOneByIdUser') private readonly getOneByIdUser: GetOneByIdUser,
    @Inject('GetOneByEmailUser')
    private readonly getOneByEmailUser: GetOneByEmailUser,
    @Inject('SaveUser') private readonly saveUser: SaveUser,
  ) {}

  @Get()
  async getAll() {
    const result = await this.getAllUser.run();
    if (!result.isValid) throw result.getError();

    return result.getValue().map((user) => user.toPlain());
  }

  @Get('/id/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getOneById(@Param() params: FindUserIdDTO) {
    const result = await this.getOneByIdUser.run(params);

    if (!result.isValid) {
      const error = result.getError();

      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof ErrorAbstract) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }

    const user = result.getValue();
    return user.toPlain();
  }

  @Get('/email/:email')
  async getOneByEmail(@Param() params: FindUserEmailDTO) {
    const result = await this.getOneByEmailUser.run(params);
    if (!result.isValid) {
      const error = result.getError();

      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof ErrorAbstract) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }

    const user = result.getValue();
    if (!user) return [];
    return user.toPlain();
  }

  @Post()
  async save(@Body() create: CreateUserDTO) {
    const result = await this.saveUser.run(create);

    if (!result.isValid) {
      const error = result.getError();
      if (error instanceof UserAlreadyExists) {
        throw new ConflictException(error.message);
      }

      if (error instanceof ErrorAbstract) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }

    return result.getValue().toPlain();
  }

  @Delete(':id')
  @HttpCode(204) // Estándar para borrado exitoso sin contenido
  async delete(@Param('') param: FindUserIdDTO) {
    const result = await this.deleteUser.run(param);

    if (!result.isValid) {
      const error = result.getError();

      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof ErrorAbstract) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }

    return; // No devolvemos nada
  }
}
