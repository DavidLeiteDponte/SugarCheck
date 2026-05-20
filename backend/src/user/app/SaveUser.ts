import { User } from '../core/User';
import { UserRepository } from '../core/UserRepository';
import { ErrorAbstract } from '../../shared/error-abstract';
import { Result } from '../../shared/result';
import { UserId } from '../../shared/core/value-objects/UserId';
import { UserName } from '../core/value-objects/UserName';
import { UserEmail } from '../core/value-objects/UserEmail';
import { UserRoles } from '../core/value-objects/UserRoles';
import { UserCreatedAt } from '../core/value-objects/UserCreatedAt';
import { UserFechaNacimiento } from '../core/value-objects/UserFechaNacimiento';
import { PasswordHasher } from '../../shared/application/ports/password-hasher.interface';
import { UserPassword } from '../core/value-objects/UserPassword';
import { GenerateUUIDInterface } from '../../shared/application/ports/generate-uuid.interface';

export class SaveUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly generateUUID: GenerateUUIDInterface,
  ) {}

  public async run(data: {
    name: string;
    email: string;
    roles: string[];
    fechaNacimiento: Date;
    password: string;
  }): Promise<Result<User, ErrorAbstract>> {
    const id = await this.generateUUID.run();
    const idRes = UserId.create(id);
    if (!idRes.isValid) return Result.fail(idRes.getError());

    const nameRes = UserName.create(data.name);
    if (!nameRes.isValid) return Result.fail(nameRes.getError());

    const emailRes = UserEmail.create(data.email);
    if (!emailRes.isValid) return Result.fail(emailRes.getError());

    const roleRes = UserRoles.create(data.roles);
    if (!roleRes.isValid) return Result.fail(roleRes.getError());

    // La fecha de creación normalmente la generamos nosotros en el registro
    const dateRes = UserCreatedAt.create(new Date());
    if (!dateRes.isValid) return Result.fail(dateRes.getError());

    const FechaNacimientoRes = UserFechaNacimiento.create(data.fechaNacimiento);
    if (!FechaNacimientoRes.isValid)
      return Result.fail(FechaNacimientoRes.getError());

    const hashedPass = await this.passwordHasher.hash(data.password);

    const passwordRes = UserPassword.create(hashedPass);
    if (!passwordRes.isValid) return Result.fail(passwordRes.getError());

    // 2. Si llegamos aquí, todos son válidos. Creamos la Entidad.
    const user = new User({
      id: idRes.getValue(),
      name: nameRes.getValue(),
      email: emailRes.getValue(),
      roles: roleRes.getValue(),
      createdAt: dateRes.getValue(),
      fechaNacimiento: FechaNacimientoRes.getValue(),
      password: passwordRes.getValue(),
    });

    // 3. Persistimos en la base de datos a través del repositorio
    return await this.repository.save(user);
  }
}
