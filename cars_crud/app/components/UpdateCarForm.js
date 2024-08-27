import { useState } from 'react';
import useResource from '../custom_hook/useResource';

export default function UpdateCarForm({ car }) {
    const { updateCar } = useResource();
    const [model, setModel] = useState(car.model);
    const [brand, setBrand] = useState(car.brand);
    const [price, setPrice] = useState(car.price);
    const [isBought, setIsBought] = useState(car.is_bought);

    function submitHandler(e) {
        e.preventDefault();
        const updatedCar = { model, brand, price, is_bought: isBought };
        updateCar(car.id, updatedCar);
    }

    return (
        <>
            <h3>Update Car</h3>
            <form onSubmit={submitHandler}>
                <input
                    className="border border-black"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="model"
                />
                <input
                    className="border border-black"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="brand"
                />
                <input
                    className="border border-black"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="price"
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isBought}
                        onChange={(e) => setIsBought(e.target.checked)}
                        className="border border-black"
                    />
                    <span>Is Bought</span>
                </label>
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1"
                >
                    Update
                </button>
            </form>
        </>
    );
}
