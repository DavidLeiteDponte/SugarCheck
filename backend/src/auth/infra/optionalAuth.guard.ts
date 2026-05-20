import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['access_token'];

    // Si no hay token, no pasa nada, permitimos el acceso (return true)
    // El request['user'] quedará como undefined
    if (!token) {
      return true; 
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Si el token es válido, sí inyectamos el usuario
      request['user'] = payload;
    } catch {
      // Si el token es inválido o expiró, tampoco rompemos la petición.
      // Simplemente dejamos pasar al usuario como "invitado" borrando cualquier basura del request
      request['user'] = undefined;
    }

    return true; // Siempre permite el acceso
  }
}