import { pool } from "../database/pool";
import { User } from "../domain/User";

export const register = async (newUser: User) => {
  const { id, username, email, password } = newUser;
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3, $4)";
  const values = [id, username, email, password];

  try {
    const response = await pool.query(query, values);
    const result = response.rows;
    return result;
  } catch (error: any) {
    throw new Error(
      `[userService] No se pudo registrar el usuario en la base de datos. Detalles: ${error.message}`,
    );
  }
};
