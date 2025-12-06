import { pool } from "../../config/db";

const getAll = async () => {
  return await pool.query(`SELECT id, name, email, phone, role FROM Users`);
};
const updateOne = async (
  id: string,
  payload: Record<string, unknown>,
  userRole?: string,
  userId?: number
) => {
  const userCheck = await pool.query(`SELECT * FROM Users WHERE id = $1`, [id]);
  if (userCheck.rows.length === 0) {
    throw new Error("User not found");
  }

  if (userRole === "customer" && userId !== parseInt(id)) {
    throw new Error("You can only update your own profile");
  }

  const fields = [];
  const values = [];
  let index = 1;

  if (payload.name) {
    fields.push(`name=$${index++}`);
    values.push(payload.name);
  }
  if (payload.email) {
    fields.push(`email=$${index++}`);
    values.push(payload.email);
  }
  if (payload.phone) {
    fields.push(`phone=$${index++}`);
    values.push(payload.phone);
  }

  if (payload.role) {
    if (userRole !== "admin") {
      throw new Error("Only admins can update user roles");
    }
    fields.push(`role=$${index++}`);
    values.push(payload.role);
  }

  if (fields.length === 0) {
    return await pool.query(
      `SELECT id, name, email, phone, role FROM Users WHERE id = $1`,
      [id]
    );
  }

  values.push(id);
  const query = `UPDATE Users SET ${fields.join(
    ", "
  )} WHERE id=$${index} RETURNING id, name, email, phone, role`;

  return await pool.query(query, values);
};

const deleteOne = async (id: string) => {
  return await pool.query(`DELETE FROM Users WHERE id = $1`, [id]);
};

export const userServices = {
  getAll,
  updateOne,
  deleteOne,
};
