import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};


export const validatePassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    throw new Error("Error validando la contraseña");
  }
};