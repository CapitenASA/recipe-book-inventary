import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { EncryptService } from 'src/tools/encrypt.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    // private encryptService: EncryptService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
    // try {
    //   const encryptPassword = await this.encryptService.encrypt(
    //     createUserDto.password,
    //   );
    //   const userToSave: CreateUserDto = {
    //     ...createUserDto,
    //     password: encryptPassword,
    //   };
    //   encryptPassword;
    //   const result = await this.userRepository.save(userToSave);

    //   console.log(result);
    //   return result;
    // } catch (error) {
    //   console.log(error);
    // }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
