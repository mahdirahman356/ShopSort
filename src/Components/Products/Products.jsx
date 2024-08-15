import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VscActivateBreakpoints } from "react-icons/vsc";

const Products = () => {


    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/products")
            return res.data
        }
    })

    return (
        <div className="w-[95%] md:w-[80%] mx-auto my-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                products.map((pro, index) => <div key={index} className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body p-9">
                        <h2 className="text-xl font-semibold">{pro.productName}</h2>
                        <p>{pro.description}</p>
                        <div className="my-4 space-y-1">
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Brand</span>{pro.brand}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Category</span>{pro.category}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Ratings</span>{pro.ratings}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Date</span>{pro.createdAt.split("T")[0]}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Time</span>{pro.createdAt.split("T")[1].split("Z")[0]}</p>
                        </div>
                        <h2 className="text-xl font-bold text-end text-red-500">120$</h2>

                    </div>
                </div>)
            }
        </div>
    );
};

export default Products;