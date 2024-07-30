import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useEditUser, useUsers } from "../../Hooks";

const ManageUsers = () => {
  const { users, isLoading } = useUsers();
  const navigate = useNavigate();

  const { mutate: deleteFlight } = useEditUser();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" container mt-20  mx-auto overflow-x-auto ">
      <h1
        style={{
          fontSize: 35,
          fontWeight: "bold",
          marginTop: 20,
          color: "#209326",
        }}
      >
        Manage Users
      </h1>
      <table className="w-full shadow-md sm:rounded-lg mt-10 text-sm text-left rtl:text-right text-white">
        <thead className="text-xs text-black uppercase bg-white border-b border-gray-200">
          <tr>
            <th scope="col" className="px-6 text-center py-3">
              Name
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Email
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Mobile
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Flight
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Admin
            </th>

            <th scope="col" className="px-6 text-center py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr
                className="bg-[#fff] text-black border-b border-gray-200"
                key={index}
              >
                <td className="px-6 text-center py-4">{user.name}</td>
                <td className="px-6 text-center py-4">{user.email}</td>
                <td className="px-6 text-center py-4">{user.mobile_number}</td>

                <td className="px-6 text-center py-4">
                  {user?.flight_details?.airline?.code}
                </td>
                <td className="px-6 text-center py-4">
                  {user?.is_admin ? "Yes" : "false"}
                </td>

                <td className="px-6 py-4 flex  w-full">
                  <button
                    onClick={() => {
                      // deleteFlight(flight?._id)
                    }}
                  >
                    <AiFillDelete size={20} />
                  </button>
                  <button
                    style={{
                      marginLeft: 10,
                    }}
                    onClick={() => {
                      navigate(`/edit/user/${user._id}`);
                    }}
                  >
                    <AiFillEdit size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ManageUsers;
