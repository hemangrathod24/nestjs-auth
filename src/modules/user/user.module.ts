import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { JwtStrategy } from '../auth/strategies/jwt.strategy.ts';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [ 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),

    TypeOrmModule.forFeature([User]),
  ],  


  controllers:[UserController],
  providers: [UserService , AuthService , JwtStrategy],
  exports:[UserService]
})

export class UserModule {}
