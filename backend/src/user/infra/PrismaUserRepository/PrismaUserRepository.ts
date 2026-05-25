import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from '../../core/User';
import { Result } from '../../../shared/result';
import { ErrorAbstract } from '../../../shared/error-abstract';
import { DatabaseError } from '../../../shared/DatabaseError';
import { UserRepository } from '../../core/UserRepository';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { UserName } from '../../core/value-objects/UserName';
import { UserEmail } from '../../core/value-objects/UserEmail';
import { UserRoles } from '../../core/value-objects/UserRoles';
import { UserCreatedAt } from '../../core/value-objects/UserCreatedAt';
import { UserPassword } from '../../core/value-objects/UserPassword';
import { UserFechaNacimiento } from '../../core/value-objects/UserFechaNacimiento';
import { UserNotFoundError } from '../../core/errors/UserNotFoundError';
import { UserAlreadyExists } from '../../core/errors/UserAlreadyExists';
import { UserId } from '../../../shared/core/value-objects/UserId';

interface UserDB {
  id: string;
  name: string;
  password: string;
  email: string;
  roles: string[];
  createdAt: Date;
  fechaNacimiento: Date;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  private toDomain(raw: UserDB): User {
    return new User({
      id: UserId.create(raw.id).getValue(),
      name: UserName.create(raw.name).getValue(),
      email: UserEmail.create(raw.email).getValue(),
      roles: UserRoles.create(raw.roles).getValue(),
      createdAt: UserCreatedAt.create(raw.createdAt).getValue(),
      password: UserPassword.create(raw.password).getValue(),
      fechaNacimiento: UserFechaNacimiento.create(
        raw.fechaNacimiento,
      ).getValue(),
    });
  }

  private toPersistence(user: User): UserDB {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      roles: user.roles.value,
      createdAt: user.createdAt.value,
      password: user.password.value,
      fechaNacimiento: user.fechaNacimiento.value,
    };
  }

  async getAll(): Promise<Result<User[], ErrorAbstract>> {
    try {
      const users = await this.prisma.user.findMany();
      return Result.ok(users.map((user) => this.toDomain(user)));
    } catch (error) {
      return Result.fail(
        new DatabaseError('Error al obtener los usuarios de la base de datos'),
      );
    }
  }

  async getOneByEmail(email: UserEmail): Promise<Result<User, ErrorAbstract>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email.value },
      });

      if (!user)
        return Result.fail(
          new UserNotFoundError(
            `Usuario con email ${email.value} no encontrado`,
          ),
        );

      return Result.ok(this.toDomain(user));
    } catch (error) {
      return Result.fail(
        new DatabaseError('Error técnico al buscar por email'),
      );
    }
  }

  async getOneById(id: UserId): Promise<Result<User, ErrorAbstract>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id.value },
      });

      if (!user)
        return Result.fail(
          new UserNotFoundError(`Usuario con ID ${id.value} no encontrado`),
        );

      return Result.ok(this.toDomain(user));
    } catch (error) {
      return Result.fail(new DatabaseError('Error técnico al buscar por ID'));
    }
  }

  async save(user: User): Promise<Result<User, ErrorAbstract>> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email.value },
      });

      if (existingUser) {
        return Result.fail(
          new UserAlreadyExists(
            `El email ${user.email.value} ya está registrado`,
          ),
        );
      }

      const savedUser = await this.prisma.user.create({
        data: this.toPersistence(user),
      });

      return Result.ok(this.toDomain(savedUser));
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return Result.fail(
          new UserAlreadyExists('El usuario ya existe en la base de datos'),
        );
      }
      return Result.fail(
        new DatabaseError('Error crítico al intentar guardar el usuario'),
      );
    }
  }

async update(id: UserId, update: Partial<User>): Promise<Result<User, ErrorAbstract>> {
  try {
    // 1. Es obligatorio usar await para que la base de datos se actualice realmente
    await this.prisma.user.update({
      where: { id: id.value },
      data: {
        // Usamos el encadenamiento opcional (?.) para que si el campo no viene en el Partial,
        // Prisma simplemente lo ignore y no intente actualizarlo a undefined de forma explícita.
        name: update.name?.value,
        email: update.email?.value,
        roles: update.roles?.value,
        password: update.password?.value,
        fechaNacimiento: update.fechaNacimiento?.value,
      },
    });

    // 2. Esperamos y retornamos el usuario fresco ya actualizado desde la DB
    return await this.getOneById(id);

  } catch (error) {
    // 3. Manejo de excepciones controlado para no romper la app y cumplir con la firma del método
    // Aquí puedes usar tu clase concreta de error que extienda de ErrorAbstract (ej. DatabaseError)
    const dbError = new DatabaseError(`Database error during user update: ${error instanceof Error ? error.message : String(error)}`);
    
    return Result.fail(dbError);
  }
}

  async delete(id: UserId): Promise<Result<void, ErrorAbstract>> {
    try {
      await this.prisma.user.delete({
        where: { id: id.value },
      });
      return Result.ok(undefined);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return Result.fail(
          new UserNotFoundError('No se pudo eliminar: el usuario no existe'),
        );
      }
      return Result.fail(
        new DatabaseError('Error al intentar eliminar el usuario'),
      );
    }
  }
}
