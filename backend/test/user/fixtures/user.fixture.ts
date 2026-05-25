import { faker } from '@faker-js/faker';
import { User } from '../../../src/user/core/User';
import { UserEmail } from '../../../src/user/core/value-objects/UserEmail';
import { Role } from '../../../src/shared/enums/role.enum';
import { UserName } from '../../../src/user/core/value-objects/UserName';
import { UserPassword } from '../../../src/user/core/value-objects/UserPassword';
import { UserRoles } from '../../../src/user/core/value-objects/UserRoles';
import { UserCreatedAt } from '../../../src/user/core/value-objects/UserCreatedAt';
import { UserFechaNacimiento } from '../../../src/user/core/value-objects/UserFechaNacimiento';
import { UserId } from '../../../src/shared/core/value-objects/UserId';

// Definimos una interfaz para los datos que queremos permitir personalizar
interface UserOverrides {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  roles?: Role[];
  createdAt?: Date;
  fechaNacimiento?: Date;
}

export class UserFactory {
  /**
   * Genera los datos base y permite sobrescribir los que necesites
   */
  static createRaw(overrides: UserOverrides = {}) {
    const passwordRaw =
      overrides.password ??
      faker.internet.password({ length: 11 }) + faker.string.numeric(1);

    // Usamos el operador ?? para dar prioridad al dato que pases por parámetro
    const data = {
      id: UserId.create(overrides.id ?? faker.string.uuid()).getValue(),
      name: UserName.create(
        overrides.name ?? faker.person.fullName(),
      ).getValue(),
      password: UserPassword.create(passwordRaw).getValue(),
      email: UserEmail.create(
        overrides.email ?? faker.internet.email(),
      ).getValue(),
      roles: UserRoles.create(overrides.roles ?? [Role.Guerrero]).getValue(),
      createdAt: UserCreatedAt.create(
        overrides.createdAt ?? new Date(),
      ).getValue(),
      fechaNacimiento: UserFechaNacimiento.create(
        overrides.fechaNacimiento ?? faker.date.birthdate(),
      ).getValue(),
    };

    return data;
  }

  /**
   * Crea una instancia real de la Entidad Dominio con datos personalizados
   */
  static createInstance(overrides: UserOverrides = {}): User {
    const data = this.createRaw(overrides);
    return new User(data);
  }

  /**
   * Genera un array de usuarios (útil para pruebas de GetAll)
   */
  static createManyInstances(
    count: number,
    overrides: UserOverrides = {},
  ): User[] {
    return Array.from({ length: count }, () => this.createInstance(overrides));
  }
}
