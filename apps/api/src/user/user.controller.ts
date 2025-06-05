import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity";
import { UserMe } from "./user-me.decorator";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UserController {
  // constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id", ParseIntPipe) id: number) {
  //   return this.userService.findOne({ id });
  // }

  // @Patch(":id")
  // update(
  //   @Param("id", ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto
  // ) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(":id")
  // remove(@Param("id", ParseIntPipe) id: number) {
  //   return this.userService.remove(id);
  // }

  @Get("me")
  me(@UserMe() user: UserEntity) {
    return user;
  }
}
