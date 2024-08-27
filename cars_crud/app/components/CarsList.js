import { useState } from 'react';
import useResource from '../custom_hook/useResource';
import UpdateCarForm from './UpdateCarForm';

export default function CarsList() {
    const { resource, loading, deleteFun } = useResource();
    const [selectedCar, setSelectedCar] = useState(null);

    if (loading) return <p>Loading ...</p>;

    return (
        <>
            <h3>Cars List</h3>
            {selectedCar && <UpdateCarForm car={selectedCar} />}
            <ul>
                {resource.map(item => (
                    <li key={item.id} className="flex items-center space-x-2 mb-2">
                        <button
                            onClick={() => deleteFun(item.id)}
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                        >
                            X
                        </button>
                        <span>{item.model}</span>
                        <button
                            onClick={() => setSelectedCar(item)}
                            type="button"
                            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1"
                        >
                            Update
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
