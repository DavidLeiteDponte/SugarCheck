import { IsUUID } from 'class-validator';

export class FindUserIdDTO {
  @IsUUID('4', { message: 'El ID debe ser un UUID v4 válido' })
  id!: string;
}
