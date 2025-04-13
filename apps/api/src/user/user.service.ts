import {
  BadRequestException,
  Injectable,
  NotImplementedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.usernameIsTaken(createUserDto.username);

    const hash = await this.hashPassword(createUserDto.password);

    const user = this.repo.create({
      username: createUserDto.username,
      password: hash
    });

    return this.repo.save(user);
  }

  findAll(where: FindOptionsWhere<User> = {}) {
    return this.repo.find({
      where
    });
  }

  async findOne(where: FindOptionsWhere<User> = {}) {
    const user = await this.repo.findOne({
      where
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne({ id });

    if (updateUserDto.username) {
      await this.usernameIsTaken(updateUserDto.username);
    }

    if (updateUserDto.password) {
      const hash = await this.hashPassword(updateUserDto.password);
      updateUserDto.password = hash;
    }

    return this.repo.update(user.id, updateUserDto);
  }

  async usernameIsTaken(username: string) {
    const usernameIsTaken = await this.repo.findOneBy({
      username
    });

    if (usernameIsTaken) {
      throw new BadRequestException("Username is taken");
    }

    return false;
  }

  remove(id: number) {
    throw new NotImplementedException();
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
