import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(user_id: string, user_hash: string) {
    const user = await this.authService.validateUser(user_id, user_hash);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
