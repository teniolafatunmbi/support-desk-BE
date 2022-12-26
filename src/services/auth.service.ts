import bcrypt from 'bcryptjs';
import { LoginUserDto } from '../dto/login-user.dto';
import ApiError from '../utils/ApiError';
import UserService from './user.service';

class AuthService {
  protected userService = new UserService();

  /* eslint-disable class-methods-use-this */
  public async loginUser(user: LoginUserDto) {
    const existingUser = await this.userService.getUserByEmail(user.email);

    const matchingPass = await bcrypt.compare(user.password, existingUser.password);

    if (!existingUser && !matchingPass) {
      throw new ApiError(401, 'Invalid Credentials');
    }
    return existingUser;
  }
}

export default AuthService;
