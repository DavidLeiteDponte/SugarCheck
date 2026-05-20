import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

// Todos los campos de CreateUserDto ahora son opcionales (?) aquí
export class UpdateUserDto extends PartialType(CreateUserDTO) {}