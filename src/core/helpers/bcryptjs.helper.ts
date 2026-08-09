import bcrypt from "bcryptjs";

const encrypt = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const decrypt = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

export const bcryptManager = { encrypt, decrypt };
