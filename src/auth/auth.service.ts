import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      id: user._id,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      statusCode: HttpStatus.OK,
      token: token,
    };
  }

  async signUp(user: User) {
    const existingUser = await this.userService.findOne(user.username);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const createdUser = await this.userService.create(user);

    const payload = {
      username: createdUser.username,
      id: createdUser._id,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      statusCode: HttpStatus.OK,
      token: token,
    };
  }
}
