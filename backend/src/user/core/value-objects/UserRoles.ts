import { Role } from '../../../shared/enums/role.enum';
import { Result } from '../../../shared/result';
import { UserRoleInvalidError } from '../errors/UserRoleInvalidError';

export class UserRoles {
  public readonly value: string[];
  private constructor(value: Role[]) {
    this.value = value;
  }

  public static create(
    values: string[],
  ): Result<UserRoles, UserRoleInvalidError> {
    const validRoles: string[] = [
      Role.Admin,
      Role.Guerrero,
    ];

    // 1. Validar que no sea un array vacío (regla de negocio opcional)
    if (!values || values.length === 0) {
      return Result.fail(
        new UserRoleInvalidError('El usuario debe tener al menos un rol.'),
      );
    }

    // 2. Validar que CADA rol enviado esté en la lista permitida
    for (const role of values) {
      if (!validRoles.includes(role)) {
        return Result.fail(
          new UserRoleInvalidError(
            `El rol "${role}" no es válido. Opciones: ${validRoles.join(', ')}`,
          ),
        );
      }
    }

    // 3. Eliminar duplicados (por si envían ['Estudiantes', 'Estudiantes'])
    const uniqueRoles = [...new Set(values)] as Role[];

    return Result.ok(new UserRoles(uniqueRoles));
  }

  // Método helper útil para el dominio
  public hasRole(role: Role): boolean {
    return this.value.includes(role);
  }
}
