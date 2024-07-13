import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppServiceOptions } from './app.service.options';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow('MONGO_URI'),
        appName: config.getOrThrow('APP_NAME'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: AppServiceOptions,
      useFactory: (config: ConfigService) => ({
        helloWorld: config.get('HELLO_WORLD', 'Hello World!'),
      }),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
