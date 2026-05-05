import { Module } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { SavePreference } from '../../app/SavePreference';
import { UpdatePreference } from '../../app/UpdatePreference';
import { PreferenceRepository } from '../../core/PreferenceRepository';
import { PrismaPreferenceRepository } from '../PrismaPreferenceRepository/PrismaPreferenceRepository';
import { GetOneByIdPreference } from '../../app/GetOneByUserIdPreference';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'PreferenceRepository',
      useClass: PrismaPreferenceRepository,
    },
    {
      provide: 'GetOneByIdPreference',
      useFactory: (repo: PreferenceRepository) => new GetOneByIdPreference(repo),
      inject: ['PreferenceRepository'],
    },
    {
      provide: 'SavePreference',
      useFactory: (repo: PreferenceRepository) => new SavePreference(repo),
      inject: ['PreferenceRepository'],
    },
    {
      provide: 'UpdatePreference',
      useFactory: (repo: PreferenceRepository) => new UpdatePreference(repo),
      inject: ['PreferenceRepository'],
    },
  ],
  controllers: [PreferenceController],
})
export class PreferenceModule {}
