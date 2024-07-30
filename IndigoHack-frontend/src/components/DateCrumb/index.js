import React from "react";
import moment from "moment";

function DateCrumb() {
  return (
    <div
      className="flex  rounded
      m-10     overflow-hidden shadow-lg mt-20"
    >
      <div
        style={{
          alignItems: "center",
        }}
        className="flex w-full flex-row items-baseline flex-nowrap bg-blue-600 p-2"
      >
        {/* <MdFlightTakeoff style={{}} /> */}
        <div>
          <img
            src={require("../../assets/indigo-plane.png")}
            width={20}
            height={20}
            style={{
              filter: "invert(1)",
            }}
            alt=""
          />
        </div>
        <div className="flex flex-row mt-1">
          <h1
            className="ml-2 uppercase font-bold text-white"
            style={{
              letterSpacing: 1,
            }}
          >
            departures
          </h1>
          <p className="ml-2 font-normal text-white">
            {moment(new Date()).format("MMMM Do YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DateCrumb;
