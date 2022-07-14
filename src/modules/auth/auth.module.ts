import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PlansModule } from '../plans/plans.module';
import { UsersModule } from '../users/users.module';
import { AccessGuard } from './access.guard';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ManagementGuard } from './management.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRE') || '1d' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    PlansModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AdminGuard,
    ManagementGuard,
    AccessGuard,
  ],
  exports: [
    AuthService,
    JwtAuthGuard,
    AdminGuard,
    ManagementGuard,
    AccessGuard,
  ],
})
export class AuthModule {}
