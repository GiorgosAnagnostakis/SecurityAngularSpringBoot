export class JwtPayload {
    roles: string[];
    username: string;
    iat: number;
    exp: number;
    accessToken: string;
  }