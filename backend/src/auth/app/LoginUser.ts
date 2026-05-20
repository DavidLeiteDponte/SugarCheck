import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { PasswordHasher } from '../../shared/application/ports/password-hasher.interface';
import { LoginDTO } from '../infra/DTOs/login.dto';
import { Result } from '../../shared/result';
import { ErrorAbstract } from '../../shared/error-abstract';
import { InvalidCredentialsError } from '../core/errors/InvalidCredentialsError';
import { AccountSuspendedError } from '../core/errors/AccountSuspendedError'; // Ejemplo adicional
import type { GetOneByEmailInterface } from './ports/GetOneByEmailInterface';

@Injectable()
export class LoginUser {
  constructor(
    @Inject('GetOneByEmailUser')
    private readonly GetOneByEmailUser: GetOneByEmailInterface,
    @Inject('BcryptHasher')
    private readonly Hasher: PasswordHasher,
    private readonly jwtService: JwtService,
  ) {}

  async run(
    dto: LoginDTO,
  ): Promise<Result<{ at: string; rt: string }, ErrorAbstract>> {
    // 1. Buscar el usuario
    const userResult = await this.GetOneByEmailUser.run({ email: dto.email });

    /**
     * IMPORTANTE: Si el usuario no existe, devolvemos InvalidCredentialsError.
     * No decimos "Usuario no encontrado" por seguridad, para evitar enumeración de cuentas.
     */
    if (!userResult.isValid) {
      return Result.fail(
        new InvalidCredentialsError(
          'El correo o la contraseña son incorrectos',
        ),
      );
    }

    const user = userResult.getValue();

    // 2. Verificar estado de la cuenta (Opcional pero recomendado para EduFlow)
    // Supongamos que tu entidad User tiene una propiedad isActive o similar
    // if (user._isActive && !user._isActive.value) {
    //   return Result.fail(
    //     new AccountSuspendedError(
    //       'Tu cuenta está suspendida. Contacta a soporte técnico.',
    //     ),
    //   );
    // }

    // 3. Comparar contraseñas
    const isMatch = await this.Hasher.compare(
      dto.password,
      user.password.value,
    );

    if (!isMatch) {
      return Result.fail(
        new InvalidCredentialsError(
          'El correo o la contraseña son incorrectos',
        ),
      );
    }

    // 4. Generar Payload
    // Aquí podrías añadir una "tokenVersion" si decides implementarla luego
    const payload = {
      sub: user.id.value,
      name: user.name.value,
      roles: user.roles.value,
    };

    // 5. Firmar Tokens
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return Result.ok({ at, rt });
  }
}
