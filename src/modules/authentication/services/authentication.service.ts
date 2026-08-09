import { bcryptManager } from "@bk/helpers/bcryptjs.helper";
import { userRepository } from "@bk/repositories/users";
import type { ILoginDto } from "../dtos";
import { AppError } from "@bk/error-http";
import { loginMapper } from "../mappers";
import { generateAccessToken } from "@bk/security";

const login = async (login: ILoginDto) => {
  const user = await userRepository.getByEmailAndIsClient(login.email);

  if (!user) {
    throw new AppError(404, {
      xCode: `El correo ${login.email} no se encuentra registrado`,
      xMessage: "NOT_FOUND",
    });
  }

  const verifyPass = await bcryptManager.decrypt(login.password, user.password);

  if (!verifyPass) {
    throw new AppError(401, {
      xMessage: "Credenciales inválidas",
      xCode: "CREDENTIALS_INVALID",
    });
  }

  const newUser = loginMapper(user);
  const newAccessToken = generateAccessToken({
    id: newUser.id,
    email: newUser.email,
  });

  return { accessToken: newAccessToken, user: newUser };
};

const myInfo = async (email: string) => {
  const user = await userRepository.getByEmailAndIsClient(email);

  if (!user) {
    throw new AppError(404, {
      xCode: `Tu perfil no es encuentra`,
      xMessage: "NOT_FOUND",
    });
  }

  return loginMapper(user);
};

export const authenticationService = { login, myInfo };
