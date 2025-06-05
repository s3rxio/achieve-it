import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { TaskEntity } from "./entities/task.entity";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})

export class TaskModule { }
