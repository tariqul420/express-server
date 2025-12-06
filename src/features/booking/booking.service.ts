import { pool } from "../../config/db";

const postOne = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM Vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);
  const durationDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = vehicle.daily_rent_price * durationDays;

  const bookingResult = await pool.query(
    `INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  return {
    rows: [
      {
        ...bookingResult.rows[0],
        vehicle: {
          vehicle_name: vehicle.vehicle_name,
          daily_rent_price: vehicle.daily_rent_price,
        },
      },
    ],
  };
};

const getAll = async () => {
  return await pool.query(`SELECT * FROM Bookings`);
};

async function updateOne(id: string, payload: Record<string, unknown>) {
  const { status } = payload;

  return await pool.query(
    `UPDATE Bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status]
  );
}

export const bookingServices = {
  postOne,
  getAll,
  updateOne,
};
