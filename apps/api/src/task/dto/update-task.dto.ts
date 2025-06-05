import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.types";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsEnum(TaskStatus)
    @ApiProperty({
        enum: TaskStatus
    })
    status?: TaskStatus;
}
