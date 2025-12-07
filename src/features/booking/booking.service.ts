import { pool } from "../../config/db";

const postOne = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleQuery = `
    SELECT vehicle_name, daily_rent_price 
    FROM Vehicles 
    WHERE id = $1
  `;
  const vehicleResult = await pool.query(vehicleQuery, [vehicle_id]);

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

  const bookingQuery = `
    INSERT INTO Bookings (
      customer_id, 
      vehicle_id, 
      rent_start_date, 
      rent_end_date, 
      total_price, 
      status
    ) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *
  `;

  const bookingResult = await pool.query(bookingQuery, [
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    totalPrice,
    "active",
  ]);

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

const getAll = async (userRole?: string, userId?: number) => {
  let query = `
    SELECT 
      b.*,
      u.name AS customer_name,
      u.email AS customer_email,
      v.vehicle_name,
      v.registration_number,
      v.type AS vehicle_type
    FROM Bookings b
    LEFT JOIN Users u ON b.customer_id = u.id
    LEFT JOIN Vehicles v ON b.vehicle_id = v.id
  `;

  const params: any[] = [];

  if (userRole === "customer" && userId) {
    query += ` WHERE b.customer_id = $1`;
    params.push(userId);
  }

  const result = await pool.query(query, params);

  const formattedData = result.rows.map((row) => {
    const baseData = {
      id: row.id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
      },
    };

    if (userRole === "admin") {
      return {
        ...baseData,
        customer_id: row.customer_id,
        customer: {
          name: row.customer_name,
          email: row.customer_email,
        },
      };
    } else {
      return {
        ...baseData,
        vehicle: {
          ...baseData.vehicle,
          type: row.vehicle_type,
        },
      };
    }
  });

  return { rows: formattedData };
};

async function updateOne(
  id: string,
  payload: Record<string, unknown>,
  userRole?: string,
  userId?: number
) {
  const { status } = payload;

  const validStatuses = ["active", "cancelled", "returned"];
  if (!validStatuses.includes(status as string)) {
    throw new Error(
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`
    );
  }

  const bookingQuery = `SELECT * FROM Bookings WHERE id = $1`;
  const bookingResult = await pool.query(bookingQuery, [id]);

  if (bookingResult.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingResult.rows[0];

  if (userRole === "customer") {
    if (booking.customer_id !== userId) {
      throw new Error("You can only cancel your own bookings");
    }

    if (status !== "cancelled") {
      throw new Error("Customers can only cancel bookings");
    }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);
    if (startDate <= today) {
      throw new Error("Cannot cancel booking that has already started");
    }
  }

  const updateQuery = `
    UPDATE Bookings 
    SET status = $1 
    WHERE id = $2 
    RETURNING *
  `;
  const result = await pool.query(updateQuery, [status, id]);

  let vehicleStatus = null;
  if (status === "cancelled" || status === "returned") {
    const vehicleQuery = `
      UPDATE Vehicles 
      SET availability_status = $1 
      WHERE id = $2
    `;
    await pool.query(vehicleQuery, ["available", booking.vehicle_id]);
    vehicleStatus = "available";
  }

  if (status === "returned" && vehicleStatus) {
    return {
      rows: [
        {
          ...result.rows[0],
          vehicle: {
            availability_status: vehicleStatus,
          },
        },
      ],
    };
  }

  return result;
}

export const bookingServices = {
  postOne,
  getAll,
  updateOne,
};
