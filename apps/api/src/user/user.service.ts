import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>
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

  findAll(where: FindOptionsWhere<UserEntity> = {}) {
    return this.repo.find({
      where
    });
  }

  async findOne(
    where: FindOptionsWhere<UserEntity> = {},
    relations: FindOptionsRelations<UserEntity> = {}
  ) {
    const user = await this.repo.findOne({
      where,
      relations,
      loadRelationIds: true
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
    const user = this.findOne({ id });

    return this.repo.delete(id);
  }

  /* TODO: Shouldn't be in UserService */
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
