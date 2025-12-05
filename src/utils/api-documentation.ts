export interface Route {
  method: string;
  path: string;
  description: string;
  auth: string;
}

export interface EndpointGroup {
  group: string;
  routes: Route[];
}

export const endpoints: EndpointGroup[] = [
  {
    group: "Authentication",
    routes: [
      {
        method: "POST",
        path: "/api/v1/auth/signup",
        description: "Register a new user",
        auth: "Public",
      },
      {
        method: "POST",
        path: "/api/v1/auth/signin",
        description: "Sign in to get access token",
        auth: "Public",
      },
    ],
  },
  {
    group: "Users",
    routes: [
      {
        method: "GET",
        path: "/api/v1/users",
        description: "Get all users",
        auth: "Admin",
      },
      {
        method: "PUT",
        path: "/api/v1/users/:userId",
        description: "Update user information",
        auth: "Admin, Customer",
      },
      {
        method: "DELETE",
        path: "/api/v1/users/:userId",
        description: "Delete a user",
        auth: "Admin",
      },
    ],
  },
  {
    group: "Vehicles",
    routes: [
      {
        method: "POST",
        path: "/api/v1/vehicles",
        description: "Create a new vehicle",
        auth: "Admin",
      },
      {
        method: "GET",
        path: "/api/v1/vehicles",
        description: "Get all vehicles",
        auth: "Public",
      },
      {
        method: "GET",
        path: "/api/v1/vehicles/:vehicleId",
        description: "Get vehicle by ID",
        auth: "Public",
      },
      {
        method: "PUT",
        path: "/api/v1/vehicles/:vehicleId",
        description: "Update vehicle information",
        auth: "Admin",
      },
      {
        method: "DELETE",
        path: "/api/v1/vehicles/:vehicleId",
        description: "Delete a vehicle",
        auth: "Admin",
      },
    ],
  },
  {
    group: "Bookings",
    routes: [
      {
        method: "POST",
        path: "/api/v1/bookings",
        description: "Create a new booking",
        auth: "Admin, Customer",
      },
      {
        method: "GET",
        path: "/api/v1/bookings",
        description: "Get all bookings",
        auth: "Admin, Customer",
      },
      {
        method: "PUT",
        path: "/api/v1/bookings/:bookingId",
        description: "Update booking status",
        auth: "Admin, Customer",
      },
    ],
  },
];
