import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './config/strategy/local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JsonWebTokenService } from './services/jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
           expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
        }
         
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JsonWebTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
