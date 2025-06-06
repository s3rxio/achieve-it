import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "../task/entities/task.entity";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TaskEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
