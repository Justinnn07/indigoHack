import React from "react";
import { useEditUser, useFlights } from "../../Hooks";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

function EditUser() {
  const { id } = useParams();
  const { handleChange, handleSubmit, formState, isLoading } = useEditUser(id);
  const { flights } = useFlights();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <h1
        style={{
          fontSize: 35,
          fontWeight: "bold",
          marginTop: 20,
          color: "#209326",
        }}
      >
        Edit User
      </h1>
      <form
        onSubmit={handleSubmit}
        className="py-8 px-4 mx-auto max-w-4xl lg:py-16 space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder=" "
              value={formState.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formState.name}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="mobileNumber"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mobile Number
          </label>
          <div className="mt-2">
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="text"
              autoComplete="tel"
              value={formState.mobile_number}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-7 sm:col-span-2">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-black"
            >
              Flight
            </label>
            <select
              name="flight_details"
              id="flight_details"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              value={formState.flight_details}
              onChange={handleChange}
            >
              <option value="">None</option>
              {flights?.map((flight) => (
                <option key={flight.id} value={JSON.stringify(flight)}>
                  {flight.airline.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
