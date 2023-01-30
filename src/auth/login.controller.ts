import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class LoginController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('auth/login')
  async login(@Body() user: any) {
    console.log(user);

    return this.authService.login(user);
  }
}
