import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./entities/task.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { userId, ...restCreateTaskDto } = createTaskDto;

    const taskEntity = this.taskRepository.create({
      ...restCreateTaskDto,
      user: {
        id: userId
      }
    });

    return this.taskRepository.save(taskEntity);
  }

  async findAll(where: FindOptionsWhere<TaskEntity> = {}) {
    return this.taskRepository.find({
      where,
      relations: {
        user: true
      }
    });
  }

  async findOne(where: FindOptionsWhere<TaskEntity> = {}) {
    const task = await this.taskRepository.findOne({
      where
    });

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    return task;
  }

  async update(where: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne({ id: where });

    await this.taskRepository.update(task.id, updateTaskDto);
    return {
      ...task,
      ...updateTaskDto
    };
  }

  async remove(id: number) {
    const task = await this.findOne({ id });

    await this.taskRepository.remove(task);

    return {
      message: "Task deleted"
    };
  }
}
