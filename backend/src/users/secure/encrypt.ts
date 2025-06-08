import * as bcrypt from 'bcrypt';
export const encrypt = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
