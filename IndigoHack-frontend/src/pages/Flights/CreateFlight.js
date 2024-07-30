import React from 'react';
import {useCreateFlight} from "../../Hooks";

const CreateFlight = () => {
    const {
        handleSubmit
    } = useCreateFlight()
    return (
        <div className="container mx-auto">
            <h1 style={{
                fontSize: 35,
                fontWeight: "bold",
                marginTop: 20,
                color: "#209326",
            }}>Create Flight</h1>
            <section>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-black">Airline
                                    Name</label>
                                <input type="text" name="name" id="name"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       placeholder="Type Airline Name" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="code"
                                       className="block mb-2 text-sm font-medium text-black">Airline
                                    Code</label>
                                <input type="text" name="code" id="code"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       placeholder="Type Airline Code" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="departureTime"
                                       className="block mb-2 text-sm font-medium text-black">Departure
                                    Date Time</label>
                                <input type="datetime-local" name="departureTime" id="departureTime"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="departureLocation"
                                       className="block mb-2 text-sm font-medium text-black">Departure
                                    Location</label>
                                <input type="text" name="departureLocation" id="departureLocation"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       placeholder="Type Departure Location" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="boarding_time"
                                       className="block mb-2 text-sm font-medium text-black">Boarding
                                    Time</label>
                                <input type="datetime-local" name="boarding_time" id="boarding_time"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="arrivalTime"
                                       className="block mb-2 text-sm font-medium text-black">Arrival
                                    Date Time</label>
                                <input type="datetime-local" name="arrivalTime" id="arrivalTime"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="arrivalLocation"
                                       className="block mb-2 text-sm font-medium text-black">Arrival
                                    Location</label>
                                <input type="text" name="arrivalLocation" id="arrivalLocation"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       placeholder="Type Arrival Location" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="status"
                                       className="block mb-2 text-sm font-medium text-black">Flight
                                    Status</label>
                                <select name="status" id="status"
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required>
                                    <option value="On Time">On Time</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="Boarding">Boarding</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="gate"
                                       className="block mb-2 text-sm font-medium text-black">Gate</label>
                                <input type="text" name="gate" id="gate"
                                       className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       placeholder="Type Gate" required />
                            </div>
                        </div>
                        <button type="submit"
                                className="w-full items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                            Add Flight
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CreateFlight;
