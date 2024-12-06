import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { pool } from "../database/pool";
import { User } from "../domain/User";
import { authUser } from "../domain/authUser";
import {
  validatePassword,
  validateUserExists,
} from "../helper/userServiceHelper";

dotenv.config();
const SALT_ROUNDS = String(process.env.SALT_ROUNDS);

export const register = async (newUser: User) => {
  try {
    const { username, email, password } = newUser;
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const id = uuidv4();

    await pool.query(
      "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
      [id, username, email, hashedPassword],
    );

    return { id, username, email, password: hashedPassword } as User;
  } catch (error: any) {
    throw new Error(
      `[userService] Error al intentar registrar el usuario en la base de datos. Detalles: ${error.message}`,
    );
  }
};

export const findByEmail = async (email: string) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  } catch (error: any) {
    throw new Error(
      `[userService] Error al buscar el usuario con el email '${email}'. Detalles: ${error.message}`,
    );
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userExists = await findByEmail(email);
    validateUserExists(userExists);
    validatePassword(password, userExists);

    return { id: userExists.id, username: userExists.username } as authUser;
  } catch (error: any) {
    throw new Error(
      `[userService] Error al intentar iniciar sesión. Detalles: ${error.message}`,
    );
  }
};
