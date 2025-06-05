import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserMe } from "../user/user-me.decorator";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskGuard } from "./task.guard";
import { TaskService } from "./task.service";

@ApiTags("tasks")
@ApiBearerAuth()
@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @UserMe("id") userId: number) {
    return this.taskService.create({
      ...createTaskDto,
      userId
    });
  }

  @Get()
  findAll(@UserMe("id") userId: number) {
    return this.taskService.findAll({
      user: {
        id: userId
      }
    });
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number, @UserMe("id") userId: number) {
    return this.taskService.findOne({
      id,
      user: {
        id: userId
      }
    });
  }

  @UseGuards(TaskGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }
}
