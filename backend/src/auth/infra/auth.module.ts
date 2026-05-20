import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../../user/infra/Nest/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { BcryptHasher } from '../../shared/infrastructure/security/bcrypt-hasher';
import { AuthController } from './auth.controller';
import { RefreshAccessToken } from '../app/RefreshAccessToken';
import { LoginUser } from '../app/LoginUser';
import { Logout } from '../app/LogoutUser';
import { AuthGuard } from './auth.guard';
import { OptionalAuthGuard } from './optionalAuth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    // ➔ Rompemos el bucle envolviendo UserModule en forwardRef
    forwardRef(() => UserModule), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Es vital registrar los Guards como providers si van a ser instanciados/inyectados por Nest
    AuthGuard,
    OptionalAuthGuard,
    RolesGuard,
    {
      provide: 'BcryptHasher',
      useClass: BcryptHasher,
    },
    LoginUser,
    RefreshAccessToken,
    Logout,
    AuthService,
  ],
  // Exportamos para que UserModule y otros módulos lean el JwtService y los Guards sin fallas
  exports: [JwtModule, AuthGuard, OptionalAuthGuard, RolesGuard], 
})
export class AuthModule {}