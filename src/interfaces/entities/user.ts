export interface UserImp {
  id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
  userWhoUpdatedId: string | null;
}

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  userWhoUpdatedId: string | null;
}

export interface UserPersistance {
  username: string;
  email: string;
  name: string;
  password: string;
  updatedAt: Date | null;
  userWhoUpdatedId: string | null;
}
