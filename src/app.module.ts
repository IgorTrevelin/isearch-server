import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import * as path from 'path';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
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
    ConfigModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
