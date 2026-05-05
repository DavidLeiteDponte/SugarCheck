import { Module } from '@nestjs/common';
import { UserModule } from './user/infra/Nest/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infra/auth.module';
import { PreferenceModule } from './preference/infra/Nest/preference.module';

@Module({
  imports: [
    // 1. PRIMERO cargamos la configuración
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'production'}`,
    }),
    // 2. DESPUÉS los módulos que dependen de esas variables
    UserModule,
    AuthModule,
    PreferenceModule,
  ],
})
export class AppModule {}
