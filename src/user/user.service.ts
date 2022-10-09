import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptUtil } from 'src/utiles/encrypt.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    
    const { user_id, user_pw, user_name, user_email } = createUserDto;

    const encryptUtil = new EncryptUtil();
    const [user_hash, user_salt] = encryptUtil.encrypt(user_pw);
   
    // 이메일 인증 기능
    
    ////

    const user = await this.userRepository.create({ 
      user_id, 
      user_hash, 
      user_salt, 
      user_name, 
      user_email 
    });
    
    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch {
      throw new Error("사용자 생성 과정에서 오류가 발생했습니다.")
    }
  }

  async findAll(): Promise<User[]> {
    
    const users = this.userRepository.find()
    return users; 
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async findOne(user_id: string): Promise<User> {

    try {
      const found = await this.userRepository.findOne({
        where: {
            user_id,
        },
      });
      return found;
    } catch {
      throw new Error("없는 번호 정보입니다.")
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(call: string) {
    // try {
    //   const found = await this.userRepository.findOne({
    //     where: {
    //         call,
    //     },
    //   });
      
    // } catch {
    //   throw new Error("없는 번호 정보입니다.")
    // } 

  }
}
