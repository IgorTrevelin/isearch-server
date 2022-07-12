import * as bcrypt from 'bcrypt';
import User from './entities/User';

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 15);
};

export const checkPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const stripUsersPasswordHash = (users: User | User[]) => {
  const delPasswordHash = (u: User) => {
    delete u.passwordHash;
    return u;
  };

  if (users instanceof Array) {
    return users.map(delPasswordHash);
  }

  return delPasswordHash(users);
};
