import { server } from "../helpers";
import axios from "axios";

const loginUser = async (loginData) => {
  const response = await server.post("/login", loginData);
  return response.data;
};

const fetchFlights = async () => {
  const { data } = await server.get("/flights");
  return data;
};

const deleteFlight = async (flightId) => {
  const response = await server.delete(`/flight/${flightId}`);
  return response.data;
};

const fetchCurrentUser = async (authToken) => {
  const response = await server.get("/user", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

const createUser = async (body, authToken) => {
  const response = await server.post("/create-user", body, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

const getUsers = async (authToken) => {
  const response = await server.get("/users", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

const fetchUserById = async (userId, authToken) => {
  const response = await server.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export {
  fetchFlights,
  deleteFlight,
  loginUser,
  fetchCurrentUser,
  createUser,
  getUsers,
  fetchUserById,
};
