import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';

@Module({
  imports: [
    JwtModule,
    forwardRef(() => {
      return UserModule;
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [AuthService, JwtStrategy],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
