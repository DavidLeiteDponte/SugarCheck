import { UserName } from './value-objects/UserName';
import { UserEmail } from './value-objects/UserEmail';
import { UserRoles } from './value-objects/UserRoles';
import { UserCreatedAt } from './value-objects/UserCreatedAt';
import { UserFechaNacimiento } from './value-objects/UserFechaNacimiento';
import { UserPassword } from './value-objects/UserPassword';
import { UserId } from '../../shared/core/value-objects/UserId';

interface UserProps {
  id: UserId;
  name: UserName;
  password: UserPassword;
  email: UserEmail;
  roles: UserRoles;
  createdAt: UserCreatedAt;
  fechaNacimiento: UserFechaNacimiento;
}

// Este es el tipo de datos "planos" que devolverá el método
export interface UserPlain {
  id: string;
  name: string;
  password: string;
  email: string;
  roles: string[];
  createdAt: Date;
  fechaNacimiento: Date;
}

export class User {
  private readonly _id: UserId;
  private _name: UserName;
  private readonly _email: UserEmail;
  private readonly _password: UserPassword;
  private readonly _roles: UserRoles;
  private readonly _createdAt: UserCreatedAt;
  private readonly _fechaNacimiento: UserFechaNacimiento;

  constructor(props: UserProps) {
    this._id = props.id;
    this._name = props.name;
    this._password = props.password;
    this._email = props.email;
    this._roles = props.roles;
    this._fechaNacimiento = props.fechaNacimiento;
    this._createdAt = props.createdAt;
  }

  // Getters
  get id(): UserId {
    return this._id;
  }
  get name(): UserName {
    return this._name;
  }
  get email(): UserEmail {
    return this._email;
  }
  get roles(): UserRoles {
    return this._roles;
  }
  get createdAt(): UserCreatedAt {
    return this._createdAt;
  }
  get fechaNacimiento(): UserFechaNacimiento {
    return this._fechaNacimiento;
  }
  get password(): UserPassword {
    return this._password;
  }

  public toPlain(): UserPlain {
    return {
      id: this._id.value,
      name: this._name.value,
      email: this._email.value,
      password: this._password.value,
      roles: this._roles.value,
      createdAt: this._createdAt.value,
      fechaNacimiento: this._fechaNacimiento.value,
    };
  }
}
