import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userToCreate = {
      ...user,
      password: hashedPassword,
    };
    const createdUser = new this.userModel(userToCreate);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username }).exec();
  }
}
