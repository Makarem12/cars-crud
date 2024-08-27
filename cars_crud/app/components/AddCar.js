import useResource from "../custom_hook/useResource";

export default function AddCars() {
    const { addCar } = useResource(); // Use addCar from useResource

    function submitHandler(e) {
        e.preventDefault();
        const carInfo = {
            model: e.target.model.value,
            brand: e.target.brand.value,
            price: e.target.price.value,
            buyer_id: 1,
            is_bought: e.target.is_bought.checked // Ensure to include this if needed
        };
        addCar(carInfo); 
    }

    return (
        <>
            <h3>Add new Car</h3>
            <form onSubmit={submitHandler}>
                <input className="border border-black" name="model" placeholder="model" />
                <input className="border border-black" name="brand" placeholder="brand" />
                <input className="border border-black" name="price" placeholder="price" />
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="is_bought" className="border border-black" />
                    <span>Is Bought</span>
                </label>
                <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                    type="submit"
                >
                    Add
                </button>
            </form>
        </>
    );
}
