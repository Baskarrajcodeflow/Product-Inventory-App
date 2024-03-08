/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  //--------------------------Auth Generate Token-----------------------------//
  async login(username: any, password: any, user_id: any): Promise<any> {
    // Generate and return JWT token upon successful authentication
    const payload = {
      username: username,
      password: password,
      user_id: user_id,
    };

    return this.jwtService.sign(payload);
  }

  async verifyJwt(jwt: string): Promise<any> {
    return await this.jwtService.verifyAsync(jwt);
  }
}
