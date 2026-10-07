import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  getMe(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }
}
