import { UserImp } from '@interfaces/entities/user';

export class User {
  #id: string;
  #username: string;
  #email: string;
  #name: string;
  #password: string;
  #createdAt: Date;
  #userWhoCreatedId: string | null;
  #updatedAt: Date | null;
  #userWhoUpdatedId: string | null;

  constructor({
    id,
    username,
    email,
    name,
    password,
    createdAt,
    userWhoCreatedId,
    updatedAt,
    userWhoUpdatedId,
  }: UserImp) {
    this.#id = id;
    this.#username = username;
    this.#email = email;
    this.#name = name;
    this.#password = password;
    this.#createdAt = createdAt;
    this.#userWhoCreatedId = userWhoCreatedId;
    this.#updatedAt = updatedAt;
    this.#userWhoUpdatedId = userWhoUpdatedId;
  }

  get id(): string {
    return this.#id;
  }

  set id(id: string) {
    this.#id = id;
  }

  get username(): string {
    return this.#username;
  }

  set username(username: string) {
    this.#username = username;
  }

  get email(): string {
    return this.#email;
  }

  set email(email: string) {
    this.#email = email;
  }

  get name(): string {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  get password(): string {
    return this.#password;
  }

  set password(password: string) {
    this.#password = password;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  set createdAt(createdAt: Date) {
    this.#createdAt = createdAt;
  }

  get userWhoCreatedId(): string | null {
    return this.#userWhoCreatedId;
  }

  set userWhoCreatedId(userWhoCreatedId: string | null) {
    this.#userWhoCreatedId = userWhoCreatedId;
  }

  get updatedAt(): Date | null {
    return this.#updatedAt;
  }

  set updatedAt(updatedAt: Date | null) {
    this.#updatedAt = updatedAt;
  }

  get userWhoUpdatedId(): string | null {
    return this.#userWhoUpdatedId;
  }

  set userWhoUpdatedId(userWhoUpdatedId: string | null) {
    this.#userWhoUpdatedId = userWhoUpdatedId;
  }
}
