import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { pbkdf2Sync } from 'crypto';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
    this.authService = authService;
    this.userService = userService;
  }

  async validate(user_id: string, password: string): Promise<any> {
    console.log('start-LocalStrategy.validate');
    const salt = await this.userService.getSaltByUserId(user_id);
    const user_hash = pbkdf2Sync(password, salt, 2048, 256, 'sha512').toString(
      'base64',
    );
    const user = await this.authService.validateUser(user_id, user_hash);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('end-LocalStrategy.validate');
    return user;
  }
}
