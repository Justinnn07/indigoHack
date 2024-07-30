import React from "react";
import FlightStatusCard from "../../components/FlightStatusCard";
import DateCrumb from "../../components/DateCrumb";
import Loader from "../../components/Loader";
import { useCurrentUser, useFlights } from "../../Hooks";

function Home() {
  const { flights, isLoading } = useFlights();

  const currentUser = useCurrentUser();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="">
      <DateCrumb />

      {!currentUser?.is_admin && typeof currentUser === "object" ? (
        <FlightStatusCard flightStatus={currentUser?.flight_details} />
      ) : (
        <>
          {flights?.map((item, index) => (
            <FlightStatusCard key={index} flightStatus={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
