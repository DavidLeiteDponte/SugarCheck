import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '../../shared/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtenemos los roles requeridos desde el decorador @Roles(...)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no tiene el decorador @Roles, es pública para cualquier usuario logueado
    if (!requiredRoles) {
      return true;
    }

    // 2. Extraemos el usuario del request
    const { user } = context.switchToHttp().getRequest();

    // Dentro de tu canActivate en el RolesGuard:

    // 3. ROBUSTEZ: Validamos que el usuario exista y tenga roles
    if (!user || !user.roles) {
      // Comprobamos si el endpoint está marcado como opcional usando el Reflector
      const isOptional = this.reflector.getAllAndOverride<boolean>('isAuthOptional', [
        context.getHandler(),
        context.getClass(),
      ]);

      // Si es opcional, dejamos que pase como invitado (el controlador manejará la escasez de datos)
      if (isOptional) {
        return true;
      }

      // Si no era opcional y no hay usuario, denegamos con total seguridad
      return false;
    }
    
    // 4. Verificación de permisos
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
