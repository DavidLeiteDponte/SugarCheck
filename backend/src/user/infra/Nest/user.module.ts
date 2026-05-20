import { Module, forwardRef } from '@nestjs/common';
import { PrismaUserRepository } from '../PrismaUserRepository/PrismaUserRepository';
import { UserController } from './user.controller';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { GetAllUser } from '../../app/GetAllUser';
import { SaveUser } from '../../app/SaveUser';
import { GetOneByEmailUser } from '../../app/GetOneByEmailUser';
import { GetOneByIdUser } from '../../app/GetOneByIdUser';
import { DeleteUser } from '../../app/DeleteUser';
import { UserRepository } from '../../core/UserRepository';
import { BcryptHasher } from '../../../shared/infrastructure/security/bcrypt-hasher';
import { GenerateUUID } from '../../../shared/infrastructure/generate-uuid';
import { GenerateUUIDInterface } from '../../../shared/application/ports/generate-uuid.interface';
import { PasswordHasher } from '../../../shared/application/ports/password-hasher.interface';
import { UpdateUser } from '../../app/UpdateUser';
import { AuthModule } from '../../../auth/infra/auth.module';

@Module({
  // ➔ Rompemos el bucle envolviendo AuthModule en forwardRef
  imports: [forwardRef(() => AuthModule)], 
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'BcryptHasher',
      useClass: BcryptHasher,
    },
    {
      provide: 'GenerateUUID',
      useClass: GenerateUUID,
    },
    {
      provide: 'GetAllUser',
      useFactory: (repo: UserRepository) => new GetAllUser(repo),
      inject: ['UserRepository'],
    },
    {
      provide: 'SaveUser',
      useFactory: (
        repo: UserRepository,
        hash: PasswordHasher,
        generate: GenerateUUIDInterface,
      ) => new SaveUser(repo, hash, generate),
      inject: ['UserRepository', 'BcryptHasher', 'GenerateUUID'],
    },
    {
      provide: 'UpdateUser',
      useFactory: (
        repo: UserRepository,
        hash: PasswordHasher,
      ) => new UpdateUser(repo, hash),
      inject: ['UserRepository', 'BcryptHasher'],
    },
    {
      provide: 'GetOneByEmailUser',
      useFactory: (repo: UserRepository) => new GetOneByEmailUser(repo),
      inject: ['UserRepository'],
    },
    {
      provide: 'GetOneByIdUser',
      useFactory: (repo: UserRepository) => new GetOneByIdUser(repo),
      inject: ['UserRepository'],
    },
    {
      provide: 'DeleteUser',
      useFactory: (repo: UserRepository) => new DeleteUser(repo),
      inject: ['UserRepository'],
    },
  ],
  controllers: [UserController],
  exports: ['GetOneByEmailUser', 'GetOneByIdUser'],
})
export class UserModule {}