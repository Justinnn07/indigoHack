import React, { useState } from "react";
import FlightStatusCard from "../../components/FlightStatusCard";
import DateCrumb from "../../components/DateCrumb";
import Loader from "../../components/Loader";
import { useCurrentUser, useFlights } from "../../Hooks";
import { server } from "../../helpers";

function Home() {
  const { flights, isLoading } = useFlights();
  const currentUser = useCurrentUser();

  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState([]);

  const searchFilter = () => {
    const arr = [...flights];
    const filteredArray = arr.filter((data) =>
      data.airline.code.toLowerCase().includes(search.toLowerCase())
    );
    setSearchArray(filteredArray);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="">
      <DateCrumb />

      <div class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Flights"
            required
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={searchFilter}
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      {!currentUser?.is_admin && typeof currentUser === "object" ? (
        <FlightStatusCard flightStatus={currentUser?.flight_details} />
      ) : (
        <>
          {search
            ? searchArray.map((item, index) => (
                <FlightStatusCard key={index} flightStatus={item} />
              ))
            : flights?.map((item, index) => (
                <FlightStatusCard key={index} flightStatus={item} />
              ))}
        </>
      )}
    </div>
  );
}

export default Home;
