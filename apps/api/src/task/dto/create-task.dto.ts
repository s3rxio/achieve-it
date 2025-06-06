import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 52)
  @ApiProperty()
  title: string;

  @IsString()
  @Length(0, 10000)
  @ApiProperty()
  description: string;

  @IsDate()
  @ApiProperty()
  dueDate?: Date;

  @IsNotEmpty()
  userId: number;
}
