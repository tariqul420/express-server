import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import config from "../../config/env";

const signup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  return await pool.query(
    `INSERT INTO Users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPass, phone, role]
  );
};

const signin = async (
  email: string,
  password: string
): Promise<{ token: string; user: any } | null> => {
  const result = await pool.query(`SELECT * FROM Users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) return null;

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) return null;

  const { email: userEmail, role, id, name, phone } = user;

  const token = jwt.sign(
    { email: userEmail, role },
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: { id, name, email: userEmail, phone, role },
  };
};

export const authServices = {
  signup,
  signin,
};
