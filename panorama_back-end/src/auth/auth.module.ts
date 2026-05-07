import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './config/strategy/local/local.strategy';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
