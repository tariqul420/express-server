import { pool } from "../../config/db";

const postOne = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  return await pool.query(
    `INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, ) VALUES ($1, $2, $3, $4) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date]
  );
};

const getAll = async () => {
  return await pool.query(`SELECT * FROM Bookings`);
};

async function updateOne(id: string, payload: Record<string, unknown>) {
  const { status } = payload;

  return await pool.query(
    `UPDATE users SET status=$1 WHERE id=$2 RETURNING *`,
    [status]
  );
}

export const bookingServices = {
  postOne,
  getAll,
  updateOne,
};
