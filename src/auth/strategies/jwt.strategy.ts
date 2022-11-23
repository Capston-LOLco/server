import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTCONSTANTS } from '../auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTCONSTANTS.secret,
    });
  }

  async validate(payload: any) {
    console.log('start-JwtStrategy.validate');
    const result = { user_id: payload.user_id, user_pw: payload.user_pw };
    console.log('end-JwtStrategy.validate');
    return result;
  }
}
