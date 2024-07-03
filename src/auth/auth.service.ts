import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<authToken> {
    const user = await this.userService.findOne({
      where: { email },
      relations: {
        cart: true,
      },
    });
    console.log(user);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      fullName: user.fullName,
      cartId: user.cart.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
