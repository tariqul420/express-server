import { pool } from "../../config/db";

const postOne = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  return await pool.query(
    `INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
};

const getAll = async () => {
  return await pool.query(`SELECT * FROM Vehicles`);
};

const getOne = async (id: string) => {
  const result = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [id]);

  if (result.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  return result;
};

const updateOne = async (id: string, payload: Record<string, unknown>) => {
  const vehicleCheck = await pool.query(
    `SELECT * FROM Vehicles WHERE id = $1`,
    [id]
  );
  if (vehicleCheck.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const fields = [];
  const values = [];
  let index = 1;

  if (payload.vehicle_name) {
    fields.push(`vehicle_name=$${index++}`);
    values.push(payload.vehicle_name);
  }
  if (payload.type) {
    fields.push(`type=$${index++}`);
    values.push(payload.type);
  }
  if (payload.registration_number) {
    fields.push(`registration_number=$${index++}`);
    values.push(payload.registration_number);
  }
  if (payload.daily_rent_price) {
    fields.push(`daily_rent_price=$${index++}`);
    values.push(payload.daily_rent_price);
  }
  if (payload.availability_status) {
    fields.push(`availability_status=$${index++}`);
    values.push(payload.availability_status);
  }

  if (fields.length === 0) {
    return vehicleCheck;
  }

  values.push(id);
  const query = `UPDATE Vehicles SET ${fields.join(
    ", "
  )} WHERE id=$${index} RETURNING *`;

  return await pool.query(query, values);
};

const deleteOne = async (id: string) => {
  const vehicleCheck = await pool.query(
    `SELECT * FROM Vehicles WHERE id = $1`,
    [id]
  );
  if (vehicleCheck.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const activeBookingsCheck = await pool.query(
    `SELECT * FROM Bookings WHERE vehicle_id = $1 AND status = 'active'`,
    [id]
  );

  if (activeBookingsCheck.rows.length > 0) {
    throw new Error(
      "Cannot delete vehicle with active bookings. Please complete or cancel all bookings first."
    );
  }

  return await pool.query(
    `DELETE FROM Vehicles WHERE id = $1 RETURNING id, vehicle_name, registration_number`,
    [id]
  );
};

export const vehicleServices = {
  postOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
