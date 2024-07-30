import React from "react";
import { useDeleteFlight, useFlights } from "../../Hooks";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";

const ManageFlights = () => {
  const { flights, isLoading } = useFlights();
  const navigate = useNavigate();

  const { mutate: deleteFlight } = useDeleteFlight();

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
        Manage Flights
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
              Flight
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Departure Time
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Boarding Time
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Arival
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Arival Time
            </th>

            <th scope="col" className="px-6 text-center py-3">
              Gate
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Status
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {flights?.map((flight, index) => {
            return (
              <tr
                key={index}
                className="bg-[#fff] text-black border-b border-gray-200"
              >
                <td className="px-6 text-center py-4">
                  {flight?.airline?.name}
                </td>
                <td className="px-6 text-center py-4">
                  {flight?.airline?.code}
                </td>
                <td className="px-6 text-center py-4">
                  {flight?.departure?.location}
                </td>
                <td className="px-6 text-center py-4">
                  {moment(flight?.departure?.date_time).format(
                    "DD-MM-YYYY hh:mm a"
                  )}
                </td>
                <td className="px-6 text-center py-4">
                  {moment(flight?.departure?.boarding_time).format(
                    "DD-MM-YYYY hh:mm a"
                  )}
                </td>
                <td className="px-6 text-center py-4">
                  {flight?.arrival?.location}
                </td>
                <td className="px-6 text-center py-4">
                  {moment(flight?.arrival?.date_time).format(
                    "DD-MM-YYYY hh:mm a"
                  )}
                </td>

                <td className="px-6 text-center py-4">
                  {flight?.flight_status?.gate}
                </td>

                <td className="px-6 text-center py-4">
                  {flight?.flight_status?.status}
                </td>
                <td className="px-6 py-4 flex items-center text-center ml-7 ">
                  <button
                    onClick={() => {
                      deleteFlight(flight?._id);
                    }}
                  >
                    <AiFillDelete size={20} />
                  </button>
                  <button
                    style={{
                      marginLeft: 10,
                    }}
                    onClick={() => {
                      navigate(`/edit/flight/${flight._id}`);
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
export default ManageFlights;
