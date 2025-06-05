import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { TaskService } from "./task.service";

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) { }

  /* 
    Проверка принадлежности задачи текущему пользователю
  */
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) {
      return false;
    }

    /* FIXME: Бдшка лишний раз нагружается, т.к делается два запроса - при проверки и при исполнении метода в сервисе */
    const task = await this.taskService.findOne({
      id: +request.params.id,
      user: {
        id: request.user.id
      }
    });

    if (!task) {
      return false;
    }

    return true;
  }
}
