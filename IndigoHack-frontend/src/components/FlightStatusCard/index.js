import React from "react";
import { MdFlightLand } from "react-icons/md";
import moment from "moment";
function FlightStatusCard({ flightStatus }) {
  return (
    <div
      style={{}}
      className="bg-white flex flex-col border	  overflow-hidden shadow-2xl  mt-10 mx-4 sm:mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl"
    >
      <div className="mt-2 flex flex-col sm:flex-row mx-6 sm:justify-between flex-wrap">
        <div className="flex flex-row items-center p-2">
          <img
            alt={flightStatus?.airline.name}
            src={flightStatus?.airline.logo}
            className="w-12 h-12"
          />
          <div className="ml-3 flex flex-col">
            <p className="font-medium">{flightStatus?.airline.name}</p>
            <p className="text-gray-500">{flightStatus?.airline.code}</p>
          </div>
        </div>
        <div className="flex flex-col p-2 sm:w-1/3">
          <p className="font-bold text-sm text-red-600 text-left sm:text-right">
            Gate
          </p>
          <p className="text-sm text-left sm:text-right">
            {flightStatus?.flight_status?.gate}
          </p>
        </div>
      </div>
      <div className="mt-1 mx-6 flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col p-2">
          <p className="font-bold text-xl">
            {moment(flightStatus?.departure?.date_time).format("hh:mm a")}
          </p>
          <p className="text-sm">{flightStatus?.departure?.location}</p>
        </div>

        <div className="mt-1 mx-6">
          <MdFlightLand size={40} />
        </div>
        <div className="flex flex-col p-2">
          <p className="font-bold text-xl">
            {moment(flightStatus?.arrival?.date_time).format("hh:mm a")}
          </p>

          <p className="text-sm">{flightStatus?.arrival?.location}</p>
        </div>
      </div>
      <div className="mt-2 mx-6 flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col p-2">
          <p className="font-bold text-sm text-red-600">Status</p>
          <p
            style={{
              fontWeight: 600,
            }}
            className="text-bold animate__animated text-center animate__flash animate__infinite"
          >
            {flightStatus?.flight_status?.status}
          </p>
        </div>
        <div className="flex flex-col p-2">
          <p className="font-bold text-sm text-[#209326]">Boarding Time</p>
          <p className="text-sm text-center">
            {moment(flightStatus.departure.boarding_time).format("hh:mm a")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FlightStatusCard;
