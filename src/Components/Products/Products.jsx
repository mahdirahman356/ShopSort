import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { VscActivateBreakpoints } from "react-icons/vsc";

const Products = () => {

    const [search, setSearch] = useState("")
    const [sortOption, setSortOption] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");


    // get all product using tanstack query
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ["products", { search, brand: selectedBrand, category: selectedCategory, priceRange: selectedPriceRange }],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/products?search=${search}&brand=${selectedBrand}&category=${selectedCategory}&priceRange=${selectedPriceRange}`)
            return res.data
        }
    })

    // search bar handle
    const handleSearch = (e) => {
        e.preventDefault()
        let search = e.target.search.value
        setSearch(search)
        refetch()
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        console.log(e.target.value)
        refetch();
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        console.log(e.target.value)
        refetch();
    };

    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);
        console.log(e.target.value)
        refetch();
    };

    // Sorting product using switch
    const sortproducts = (products, option) => {
        switch (option) {
            case "priceLowHigh":
                return [...products].sort((a, b) => a.price - b.price)
            case "priceHighLow":
                return [...products].sort((a, b) => b.price - a.price)
            case "newProducts":
                return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            default:
                return products
        }
    };
    const sortedproducts = sortproducts(products, sortOption);

    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    const uniqueCategory = [...new Set(products.map(product => product.category))];


    return (
        <div className="w-[95%] md:w-[80%] mx-auto my-28">
            <form onSubmit={handleSearch} className="flex md:w-[60%] mx-auto">
                <input type="text"
                    placeholder="Search"
                    name="search"
                    className="input  w-full input-bordered rounded-3xl text-gray-500"
                />
                <button type="submit"><AiOutlineSearch className="text-gray-500 text-xl -ml-9" /></button>
            </form>

            <div className="flex flex-col md:flex-row items-center justify-center my-9 gap-4">
                <select value={sortOption} onChange={handleSortChange} className="select select-bordered text-gray-500 w-full max-w-xs">
                    <option value="" disabled selected>Who shot first?</option>
                    <option value="priceLowHigh">Product Price: Low to High</option>
                    <option value="priceHighLow">Product Price: High to Low</option>
                    <option value="newProducts">New Products</option>
                </select>

                <select value={selectedBrand} onChange={handleBrandChange} className="select select-bordered text-gray-500 w-full max-w-xs">
                    <option value="" disabled selected>All Brands</option>
                    {uniqueBrands.map((brand, index) => 
                    <option key={index} value={brand}>{brand}</option>
                    )}
                </select>

                <select value={selectedCategory} onChange={handleCategoryChange} className="select select-bordered text-gray-500 w-full max-w-xs">
                    <option value="" disabled selected>All Categories</option>
                    {uniqueCategory.map((category, index) => 
                    <option key={index} value={category}>{category}</option>
                    )}
                </select>

                <select value={selectedPriceRange} onChange={handlePriceRangeChange} className="select select-bordered text-gray-500 w-full max-w-xs">
                    <option value="" disabled selected>All Price Ranges</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200-500">$200 - $500</option>
                    <option value="500-1000">$500 - $1000</option>
                </select>
            </div>

            {isLoading ? (<div className="h-screen w-full flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
            ) :
                (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        sortedproducts.map((pro, index) => <div key={index} className="card bg-base-100 shadow-xl">
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
                                <h2 className="text-xl font-bold text-end text-red-500">{pro.price}$</h2>

                            </div>
                        </div>)
                    }
                </div>)
            }

        </div>
    );
};

export default Products;