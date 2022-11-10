import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptUtil } from 'src/utiles/encrypt.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
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
    const { user_id, user_pw, user_name, push_token } = createUserDto;

    const encryptUtil = new EncryptUtil();
    const [user_hash, user_salt] = encryptUtil.encrypt(user_pw);

    // 이메일 인증 기능

    ////

    const user = this.userRepository.create({
      user_id,
      user_hash,
      user_salt,
      user_name,
      push_token,
    });

    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch {
      throw new Error('사용자 생성 과정에서 오류가 발생했습니다.');
    }
  }

  async findAll(): Promise<User[]> {
    const users = this.userRepository.find();
    return users;
  }

  async findOne(user_id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          user_id,
        },
      });
      return user;
    } catch {
      throw new Error('없는 번호 정보입니다.');
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // async remove(user_id: string) {
  //   // remove user
  // }

  async getPushTokenByUserId(user_id: string) {
    return (await this.findOne(user_id)).push_token;
  }
}
