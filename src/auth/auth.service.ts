import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async validateUser(user_id: string, hash: string): Promise<any> {
    console.log('start-AuthService.validateUser');
    const user = await this.userService.findOne(user_id);
    if (user && user.user_hash == hash) {
      const { user_hash, ...result } = user;
      console.log('end-AuthService.validateUser');
      return result;
    }
    console.log('end-AuthService.validateUser');
    return null;
  }

  async login(user: any) {
    console.log('start-AuthService.login');
    const payload = { userName: user.user_name, sub: user.user_id };
    const result = {
      access_token: this.jwtService.sign(payload),
    };
    // console.log('result: ' + JSON.stringify(result));
    console.log('end-AuthService.login');
    return result;
  }
}
