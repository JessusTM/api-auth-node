import { pool } from "../database/pool";
import { User } from "../domain/User";
import { v4 } from "uuid";
import { hash, compare } from "bcrypt";
import { authUser } from "../domain/authUser";

const SALT_ROUNDS = 20;

export const register = async (newUser: User) => {
  const { username, email, password } = newUser;
  const id = v4();
  const hashedPassord = await hash(password, SALT_ROUNDS);
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3, $4)";
  const values = [id, username, email, hashedPassord];

  try {
    const response = await pool.query(query, values);
    const result = response.rows;
    return result;
  } catch (error: any) {
    throw new Error(
      `[userService] Error al intentar registrar el usuario en la base de datos. Detalles: ${error.message}`,
    );
  }
};

export const findByEmail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const value = [email];

  try {
    const usersList = await pool.query(query, value);
    const result = usersList.rows[0];
    return result;
  } catch (error: any) {
    throw new Error(
      `[userService] Error al intentar obtener el usuario con el email '${email}'. Detalles: ${error.message}`,
    );
  }
};

export const login = async (email: string, password: string) => {
  const userExists = await findByEmail(email);

  if (!userExists)
    throw new Error(`[userService] Usuario de email: ${email} no registrado`);

  const isPasswordValid = await compare(password, userExists.password); // Comparar las contraseñas de forma segura
  if (!isPasswordValid) {
    throw new Error(
      `[userService] Credenciales de inicio de sesión incorrectas`,
    );
  }

  try {
    const loggedUser: authUser = {
      id: userExists.id,
      username: userExists.username,
    };
    return loggedUser;
  } catch (error: any) {
    throw new Error(
      `[userService] Error al intentar iniciar sesión. Detalles: ${error.message}`,
    );
  }
};
