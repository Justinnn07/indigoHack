import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createUser,
  deleteFlight,
  fetchCurrentUser,
  fetchFlights,
  fetchUserById,
  getUsers,
  loginUser,
} from "../actions";
import { server } from "../helpers";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getToken, onMessage, messaging } from "../firebase";

export const useFlights = () => {
  const {
    data: flights,
    isLoading,
    refetch,
  } = useQuery("flights", fetchFlights, {
    cacheTime: 60000,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    const socket = socketIOClient("http://localhost:5500", {});
    socket.on("connect", () => {
      console.log("Welcome to Indigo Hack server");
    });

    socket.on("new_flight", (data) => {
      refetch();
    });

    socket.on("flight_update", (data) => {
      refetch();
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line
  }, []);

  return { flights, isLoading };
};

export const useEditFlight = (id) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    departureTime: "",
    departureLocation: "",
    arrivalTime: "",
    arrivalLocation: "",
    status: "On Time",
    gate: "",
    boarding_time: new Date(),
  });

  const [initialData, setInitialData] = useState({});
  const [changedFields, setChangedFields] = useState([]);

  const { data: flightData, isLoading } = useQuery({
    queryKey: ["flight_edit_data", id],
    queryFn: async () => {
      const { data } = await server.get(`/flight/${id}`);
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (flightData) {
      const initialForm = {
        name: flightData.airline.name,
        code: flightData.airline.code,
        departureTime: moment(flightData.departure.date_time).format(
          "YYYY-MM-DDTHH:mm:ss.SSS"
        ),
        departureLocation: flightData.departure.location,
        arrivalTime: moment(flightData.arrival.date_time).format(
          "YYYY-MM-DDTHH:mm:ss.SSS"
        ),
        arrivalLocation: flightData.arrival.location,
        status: flightData.flight_status?.status,
        gate: flightData.flight_status?.gate,
        boarding_time: moment(flightData?.departure?.boarding_time).format(
          "YYYY-MM-DDTHH:mm:ss.SSS"
        ),
      };

      setFormData(initialForm);
      setInitialData(initialForm);
    }
  }, [flightData]);

  const updateFlightMutation = useMutation((updatedFlight) => {
    return server.put(`/update-flight/${id}`, updatedFlight);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setChangedFields((prev) => {
      if (initialData[name] !== value && !prev.includes(name)) {
        return [...prev, name];
      } else if (initialData[name] === value) {
        return prev.filter((field) => field !== name);
      }
      return prev;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFlight = {
      airline: {
        name: formData.name,
        code: formData.code,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVLBScCmXy9waCYjOSKzxEXDzluUNmjC15w&s",
      },
      departure: {
        date_time: moment(formData.departureTime).toISOString(),
        location: formData.departureLocation,
        boarding_time: moment(formData.boarding_time).toISOString(),
      },
      arrival: {
        date_time: moment(formData.arrivalTime).toISOString(),
        location: formData.arrivalLocation,
      },
      flight_status: {
        status: formData.status,
        gate: formData.gate,
      },
    };

    updateFlightMutation.mutate(updatedFlight, {
      onSuccess: (data) => {
        alert("Flight updated successfully!");
      },
      onError: (error) => {
        alert("Error updating flight: " + error.message);
      },
    });
  };

  return { formData, handleChange, handleSubmit, isLoading };
};

export const useDeleteFlight = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteFlight, {
    onSuccess: () => {
      queryClient.invalidateQueries("flights");
    },
  });
};

export const useCreateFlight = () => {
  const createFlightMutation = useMutation((newFlight) => {
    return server.post("/add-flight", newFlight);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newFlight = {
      airline: {
        name: formData.get("name"),
        code: formData.get("code"),
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVLBScCmXy9waCYjOSKzxEXDzluUNmjC15w&s",
      },
      departure: {
        date_time: moment(formData.get("departureTime")).toISOString(),
        location: formData.get("departureLocation"),
        boarding_time: moment(formData.get("boarding_time")).toISOString(),
      },
      arrival: {
        date_time: moment(formData.get("arrivalTime")).toISOString(),
        location: formData.get("arrivalLocation"),
      },
      flight_status: {
        status: formData.get("status"),
        gate: formData.get("gate"),
      },
    };

    createFlightMutation.mutate(newFlight, {
      onSuccess: (data) => {
        alert("Flight created successfully!");
        event.target.reset();
      },
      onError: (error) => {
        console.log(error);
        alert("Error creating flight: " + error.message);
      },
    });
  };

  return { handleSubmit };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      navigate("/");
    },
    onError: (error) => {
      // Handle login error
      console.error("Login failed:", error);
    },
  });

  return { mutation };
};

export const useLoggedInUser = () => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    return accessToken;
  } else {
    return null;
  }
};

export const useCurrentUser = () => {
  const authToken = useLoggedInUser();
  const { data } = useQuery("currentUser", () => fetchCurrentUser(authToken), {
    enabled: !!authToken,
  });
  return data;
};
export const useUsers = () => {
  const token = useLoggedInUser();
  const { data: users, isLoading } = useQuery("users", () => getUsers(token));
  return { users, isLoading };
};

export const useCreateUser = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
    mobileNumber: "",
    is_admin: false,
    flight_details: {},
    access_token: "",
  });
  const authToken = useLoggedInUser();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (userData) => createUser(userData, authToken),
    onSuccess: () => {
      setFormState({
        email: "",
        password: "",
        name: "",
        mobileNumber: "",
        is_admin: false,
        flight_details: "",
        access_token: "",
      });
      navigate("/");
      alert("User Created Successfully");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: formState.email,
      password: formState.password,
      name: formState.name,
      mobile_number: formState.mobileNumber,
      flight_details: JSON.parse(formState.flight_details || "{}"),
      access_token: formState.access_token,
    };

    mutation.mutate(body);
  };

  return {
    formState,
    handleSubmit,
    handleChange,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

const updateUser = async ({ id, formState }) => {
  await server.put(`/users/${id}`, {
    ...formState,
    flight_details: JSON.parse(formState.flight_details),
  });
};
export const useEditUser = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = useLoggedInUser();

  const { data, isLoading } = useQuery(
    ["user", id],
    () => fetchUserById(id, token),
    {
      enabled: !!id,
    }
  );

  const [formState, setFormState] = useState({
    email: "",
    name: "",
    mobile_number: "",
    is_admin: false,
    flight_details: "{}",
    access_token: "",
  });

  useEffect(() => {
    if (data) {
      setFormState({
        email: data.email || "",
        name: data.name || "",
        mobile_number: data.mobile_number || "",
        is_admin: data.is_admin || false,
        flight_details: JSON.stringify(data.flight_details) || "{}",
        access_token: data.access_token || "",
      });
    }
  }, [data]);

  const mutation = useMutation((newData) => updateUser(newData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
      navigate(`/manage/users`);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ id, formState });
  };

  return {
    formState,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
export const useFirebaseNotifications = () => {
  const [notification, setNotification] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BD2kgOb9qA56b6Ka3rQZkLt4OVoMQGj9SJ-qcp7pQhpIAc92qs_t3LK31CuSx8qQioacWl1Uhi4IsxBzJ5Vle7w",
          });
          if (token) {
            console.log(token);
            await server.put(`/users/${currentUser?._id}`, {
              device_token: token,
            });
          } else {
            console.log("No registration token available.");
          }
        } else {
          console.log("Permission not granted for notifications.");
        }
      } catch (error) {
        console.error("Error requesting permission or getting token:", error);
      }
    };

    if (!currentUser?.is_admin && typeof currentUser === "object") {
      requestPermission();
    }

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      setNotification(payload.notification);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser, messaging]);

  return { notification };
};
