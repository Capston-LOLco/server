import {
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Body,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Req() req: Request) {
  //   console.log('start-AuthControllr.login');
  //   const result = await this.authService.login(req.user);
  //   console.log('end-AuthControllr.login');
  //   return result;
  // }
  @Post('login')
  async login(@Body() userDto: UserDto, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(userDto);
    res.setHeader('Authorization', 'Bearer ' + jwt);
    return res.json(jwt);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
