import { compare } from "bcrypt";
import { User } from "../domain/User";

export const validateUserExists = (user: User) => {
  if (!user) {
    throw new Error(
      `[authServiceHelper] Usuario no registrado, verifique el email proporcionado`,
    );
  }
};

export const validatePassword = async (password: string, user: User) => {
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(
      `[authServiceHelper] Contraseña incorrecta, verifique las credenciales de inicio de sesión.`,
    );
  }
};
