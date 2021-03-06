import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: +config.get('MYSQL_PORT'),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASSWORD'),
        database: config.get('MYSQL_DATABASE'),
        entities: [path.join(__dirname, 'entities', '**', '*.{ts,js}')],
        logging: false,
        debug: false,
        charset: 'utf8mb4',
        synchronize: config.get('NODE_ENV') === 'development' ? true : false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AppModule {}
