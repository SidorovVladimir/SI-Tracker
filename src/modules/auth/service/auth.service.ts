import { verifyPasword } from '../../../utils/auth';
import { AuthenticationError } from '../../../utils/errors';
import { UserService } from '../../user/service/user.service';
import { LoginInput } from '../dto/LoginDto';

export class AuthService {
  static async Login(input: LoginInput) {
    const user = await UserService.getByEmail(input.email);

    if (!user || !(await verifyPasword(input.password, user.password))) {
      throw new AuthenticationError('Неверный емейл или пароль');
    }
    return user;
  }
}
