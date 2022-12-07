import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';
import { UserService } from 'src/user/user.service';
import { isErrored } from 'stream';
import { UserDto } from './dto/user.dto';
import { Payload } from './interface/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  // async validateUser(user_id: string, user_hash: string): Promise<any> {
  //   console.log('start-AuthService.validateUser');
  //   const user = await this.userService.findOne(user_id);
  //   if (user.user_hash == user_hash) {
  //     const { user_hash, ...result } = user;
  //     console.log('비밀번호 일치');
  //     console.log('end-AuthService.validateUser');
  //     return result;
  //   }
  //   console.log('end-AuthService.validateUser');
  //   return null;
  // }
  async validateUser(userDto: UserDto): Promise<string | undefined> {
    const user = await this.userService.findOne(userDto.user_id);

    const salt = await this.userService.getSaltByUserId(user.user_id);
    const hash = pbkdf2Sync(
      userDto.user_pw,
      salt,
      2048,
      256,
      'sha512',
    ).toString('base64');

    if (hash != user.user_hash) {
      throw new UnauthorizedException();
    }

    const payload: Payload = {
      user_name: user.user_name,
      user_id: user.user_id,
    };

    return this.jwtService.sign(payload);
  }

  async login(user: any) {
    console.log('start-AuthService.login');
    const payload = { user: user.user_id, sub: user.user_pw };
    const result = {
      access_token: this.jwtService.sign(payload),
    };
    // console.log('result: ' + JSON.stringify(result));
    console.log('end-AuthService.login');
    return result;
  }
}
