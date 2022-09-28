import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
   constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

   async create(resquestPayload): Promise<User> {
      try {
        const newUser = await this.userRepository.save(resquestPayload);
        return newUser;
      } catch (error) {
         return error;
      }
   }
  

    async findOne(email:string){
       
      return this.userRepository.findOne({
         where: {email: email}
      })
    }
}
