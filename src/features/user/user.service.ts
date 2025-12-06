import { pool } from "../../config/db";

const getAll = async () => {
  return await pool.query(`SELECT * FROM Users`);
};
const updateOne = async (id: string, payload: Record<string, unknown>) => {
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
    fields.push(`role=$${index++}`);
    values.push(payload.role);
  }

  if (fields.length === 0) {
    return await pool.query(`SELECT * FROM Users WHERE id = $1`, [id]);
  }

  values.push(id);
  const query = `UPDATE Users SET ${fields.join(
    ", "
  )} WHERE id=$${index} RETURNING *`;

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
