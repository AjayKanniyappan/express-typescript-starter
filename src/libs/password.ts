import { compare, hash } from 'bcrypt';

const saltRounds = 7;

async function checkPassword(password: string, hash: string) {
  const isValid = await compare(password, hash);
  return isValid;
}

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export { checkPassword, hashPassword };
