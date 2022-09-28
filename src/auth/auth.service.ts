import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService {

   constructor(private readonly userService: UserService,
      private jwtService: JwtService){}

   async hashPassword(password: string): Promise<string> {
      return bcrypt.hash(password, 12);
    }

   async register(requestPayload){

      try{
         const { password } = requestPayload;
         const hash = await this.hashPassword(password);
         const createdUser = await this.userService.create({
            ...requestPayload,
            password: hash,
         });

         return createdUser;

      }catch(err){
         return err;
      }
   }

   async validateUser(loginPayload): Promise<any> {
      const user = await this.userService.findOne(loginPayload.email);
      if (user && user.password === loginPayload.password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
  
    async login(user: any) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }


    
}
