import { Result } from "../../shared/result";
import { UserRepository } from "../core/UserRepository";
import { ErrorAbstract } from "../../shared/error-abstract";
import { UserId } from "../../shared/core/value-objects/UserId";
import { UserEmail } from "../core/value-objects/UserEmail";
import { UserName } from "../core/value-objects/UserName";
import { UserFechaNacimiento } from "../core/value-objects/UserFechaNacimiento";
import { UserPassword } from "../core/value-objects/UserPassword";
import { PasswordHasher } from "../../shared/application/ports/password-hasher.interface";
import { User } from "../core/User";


export class UpdateUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher // Recuerda inyectar tu servicio de hash
    ) { }

    async run(id: string, update: {
        name?: string;
        email?: string;
        fechaNacimiento?: Date;
        password?: string;
    }): Promise<Result<User, ErrorAbstract>> {
        // 1. Validar ID del usuario
        if (!id) return Result.fail(new Error("User ID is required for update") as unknown as ErrorAbstract);

        const valueIdRes = UserId.create(id);
        if (!valueIdRes.isValid) return Result.fail(valueIdRes.getError());
        const userId = valueIdRes.getValue();

        // Objeto donde acumularemos los Value Objects validados para pasar al repositorio
        const validatedUpdate: any = {};

        // 2. Validaciones Parciales (Solo si el campo viene en el "update")
        if (update.name !== undefined) {
            const nameRes = UserName.create(update.name);
            if (!nameRes.isValid) return Result.fail(nameRes.getError());
            validatedUpdate.name = nameRes.getValue();
        }

        if (update.email !== undefined) {
            const emailRes = UserEmail.create(update.email);
            if (!emailRes.isValid) return Result.fail(emailRes.getError());

            // Validar unicidad del Email si cambió
            const existingUserResult = await this.userRepository.getOneByEmail(emailRes.getValue());
            if (existingUserResult.isValid) {
                const existingUser = existingUserResult.getValue();
                // Si el email pertenece a OTRO usuario, lanzamos error
                if (existingUser.id.value !== userId.value) {
                    return Result.fail(new Error("Email is already in use by another user") as unknown as ErrorAbstract);
                }
            }
            validatedUpdate.email = emailRes.getValue();
        }

        if (update.fechaNacimiento !== undefined) {
            const fechaNacimientoRes = UserFechaNacimiento.create(update.fechaNacimiento);
            if (!fechaNacimientoRes.isValid) return Result.fail(fechaNacimientoRes.getError());
            validatedUpdate.fechaNacimiento = fechaNacimientoRes.getValue();
        }

        if (update.password !== undefined) {
            const hashedPass = await this.passwordHasher.hash(update.password);
            const passwordRes = UserPassword.create(hashedPass);
            if (!passwordRes.isValid) return Result.fail(passwordRes.getError());
            validatedUpdate.password = passwordRes.getValue();
        }

        // 3. Ejecutar la actualización en el repositorio
        // Le pasamos el ID estricto y el objeto mapeado con las propiedades que sí mutaron
        const result = await this.userRepository.update(userId, validatedUpdate);
        if (!result.isValid) return Result.fail(result.getError());

        return Result.ok(result.getValue()); // Retornamos el usuario actualizado o lo que el repositorio decida retornar (puede ser void)
    }
}