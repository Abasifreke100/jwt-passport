import { Body, Controller } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';


@Controller('auth')
export class AuthController {

   constructor(private readonly authService: AuthService) {}

   async register(@Body() requestPayload: RegisterDto): Promise<User>{

      return await this.authService.register(requestPayload)
   }

   async login(@Body() loginPayload: LoginDto): Promise<User>{
      return await this.authService.validateUser(loginPayload);
   }
}
