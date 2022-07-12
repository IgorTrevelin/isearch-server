import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 15);
};

export const checkPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
