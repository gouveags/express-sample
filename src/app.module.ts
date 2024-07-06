import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppServiceOptions } from './app.service.options';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
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
