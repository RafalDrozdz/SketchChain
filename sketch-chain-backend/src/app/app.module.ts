import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import configValidationSchema from 'src/config/app.config.validation';
import { PlayerModule } from 'src/player/player.module';
import { RoomModule } from 'src/room/room.module';
import { StepModule } from 'src/step/step.module';
import { DrawingModule } from 'src/drawing/drawing.module';
import { GuessModule } from 'src/guess/guess.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database') as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AuthModule,
    PlayerModule,
    RoomModule,
    StepModule,
    DrawingModule,
    GuessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
