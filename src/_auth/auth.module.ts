import { Module } from '@nestjs/common';
import { UserModule } from 'src/_user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

import { RealmModule } from 'src/_realm/module';
import { ClientAppModule } from 'src/_client-app/module';

@Module({
  controllers: [AuthController],
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),

    RealmModule,
    ClientAppModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}