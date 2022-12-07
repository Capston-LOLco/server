import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';
import { User } from 'src/user/entities/user.entity';
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
    console.log('start - AuthService.validateUser');
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
      console.log('end - authService.validateUser - 로그인 실패');
      throw new UnauthorizedException();
    }

    const payload: Payload = {
      user_name: user.user_name,
      user_id: user.user_id,
    };
    console.log('end - authService.validateUser - 로그인 성공');
    return this.jwtService.sign(payload);
  }

  async login(user: any) {
    console.log('start - AuthService.login');
    const payload = { user: user.user_id, sub: user.user_pw };
    const result = {
      access_token: this.jwtService.sign(payload),
    };
    // console.log('result: ' + JSON.stringify(result));
    console.log('end - AuthService.login');
    return result;
  }

  async tokenValidateUser(payload: Payload): Promise<User | undefined> {
    console.log('start - AuthService.tokenValidateUser');
    const result = await this.userService.findOne(payload.user_id);
    console.log('end - AuthService.tokenValidateUser');
    return result;
  }
}
