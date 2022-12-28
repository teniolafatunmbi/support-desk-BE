import bcrypt from 'bcryptjs';

import { CreateUserDto } from '../dto/create-user.dto';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';

class UserService {
  public createUser = async (payload: CreateUserDto) => {
    // check if user with email exists in db
    const userExists = await this.isUserEmailExists(payload.email);

    if (userExists) {
      throw new ApiError(400, 'User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    // save user to db
    const newUser = await User.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      password: hashedPassword,
    });

    return newUser;
  };

  // eslint-disable-next-line class-methods-use-this
  public async isUserEmailExists(email: string) {
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getUserByEmail(email: string) {
    const user = await User.findOne({ email });

    return user;
  }
}

export default UserService;
