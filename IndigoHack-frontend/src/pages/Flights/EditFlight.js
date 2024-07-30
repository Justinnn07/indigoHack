import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import {useEditFlight} from "../../Hooks";


const EditFlight = () => {
    const { id } = useParams();
    const {
        handleSubmit, formData, handleChange, isLoading
    } = useEditFlight(id)


    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto">
            <h1 style={{
                fontSize: 35,
                fontWeight: 'bold',
                marginTop: 20,
                color: '#209326',
            }}>Edit Flight</h1>
            <section>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Airline
                                    Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type Airline Name"
                                    value={formData?.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="code" className="block mb-2 text-sm font-medium text-black">Airline
                                    Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type Airline Code"
                                    value={formData?.code}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="departureTime" className="block mb-2 text-sm font-medium text-black">Departure
                                   Date Time</label>
                                <input
                                    type="datetime-local"
                                    name="departureTime"
                                    id="departureTime"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={formData?.departureTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="departureLocation"
                                       className="block mb-2 text-sm font-medium text-black">Departure Location</label>
                                <input
                                    type="text"
                                    name="departureLocation"
                                    id="departureLocation"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type Departure Location"
                                    value={formData?.departureLocation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="departureLocation"
                                       className="block mb-2 text-sm font-medium text-black">Boarding Time</label>
                            <input type="datetime-local" value={formData.boarding_time} onChange={handleChange} name="boarding_time" id="boarding_time"
                                   className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder="Type Departure Location" required/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="arrivalTime" className="block mb-2 text-sm font-medium text-black">Arrival
                                    Time</label>
                                <input
                                    type="datetime-local"
                                    name="arrivalTime"
                                    id="arrivalTime"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={formData?.arrivalTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="arrivalLocation" className="block mb-2 text-sm font-medium text-black">Arrival
                                    Location</label>
                                <input
                                    type="text"
                                    name="arrivalLocation"
                                    id="arrivalLocation"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type Arrival Location"
                                    value={formData?.arrivalLocation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-black">Flight
                                    Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={formData?.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="On Time">On Time</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="Boarding - Gate Open">Boarding - Gate Open</option>
                                    <option value="Boarding - Gate Open">Boarding - Gate Closed</option>

                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="gate" className="block mb-2 text-sm font-medium text-black">Gate</label>
                                <input
                                    type="text"
                                    name="gate"
                                    id="gate"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type Gate"
                                    value={formData?.gate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                        Update Flight
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default EditFlight;
