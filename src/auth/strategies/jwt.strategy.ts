import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JWTCONSTANTS } from '../auth.constants';
import { AuthService } from '../auth.service';
import { Payload } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: JWTCONSTANTS.secret,
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    console.log('start-JwtStrategy.validate');
    const user = await this.authService.tokenValidateUser(payload);
    if (!user) {
      console.log('end-JwtStrategy.validate-실패');
      return done(
        new UnauthorizedException({ message: 'user doew not exist' }),
        false,
      );
    }
    console.log('end-JwtStrategy.validate-성공');
    return done(null, user);
  }
}
