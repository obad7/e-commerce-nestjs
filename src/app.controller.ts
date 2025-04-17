import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PasswordsMatch } from './Common/Pipes/passwords-matches.pipe';

@Controller(`/app`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-data')
  sendData(@Body(new PasswordsMatch()) body: object) {
    return this.appService.getHello();
  }
}
