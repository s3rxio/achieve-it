import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { User } from "./entities/user.entity";

export const UserMe = createParamDecorator(
  (data: keyof User | null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return data ? request.user[data] : request.user;
  }
);
