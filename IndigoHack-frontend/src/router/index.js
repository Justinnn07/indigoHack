import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ManageFlights from "../pages/Flights/ManageFlights";
import CreateFlight from "../pages/Flights/CreateFlight";
import EditFlight from "../pages/Flights/EditFlight";
import CreateUser from "../pages/Users/CreateUser";
import ManageUsers from "../pages/Users/ManageUsers";
import { useCurrentUser, useFirebaseNotifications } from "../Hooks";
import EditUser from "../pages/Users/EditUser";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Router = () => {
  const currentUser = useCurrentUser();

  const { notification } = useFirebaseNotifications();

  console.log(notification);
  useEffect(() => {
    if (notification?.title) {
      toast(` ${notification.body}`);
    }
  }, [notification]);

  return (
    <Routes>
      {currentUser ? null : <Route element={<Login />} path="/login" />}
      <Route element={<Home />} path="/" />

      {currentUser?.is_admin && (
        <>
          <Route element={<ManageFlights />} path="/manage/flights" />
          <Route element={<CreateFlight />} path="/create/flight" />
          <Route element={<EditFlight />} path="/edit/flight/:id" />
          <Route element={<CreateUser />} path="/create/user" />
          <Route element={<ManageUsers />} path="/manage/users" />
          <Route element={<EditUser />} path="/edit/user/:id" />
        </>
      )}
    </Routes>
  );
};
export default Router;
