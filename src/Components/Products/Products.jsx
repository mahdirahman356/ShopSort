import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";

const Products = () => {

    const [search, setSearch] = useState("")
    const [sortOption, setSortOption] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");
    const [count, setCount] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numbersOfPage = Math.ceil(count / itemsPerPage)

    const pages = [...Array(numbersOfPage).keys()]

    console.log(pages)

    console.log(count)
    // get all product using tanstack query
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ["products", { search, brand: selectedBrand, category: selectedCategory, priceRange: selectedPriceRange, page: currentPage, size: itemsPerPage }],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/products?search=${search}&brand=${selectedBrand}&category=${selectedCategory}&priceRange=${selectedPriceRange}&page=${currentPage}&size=${itemsPerPage}`)
            return res.data
        }
    })

    axios.get(`http://localhost:5000/products-count`)
        .then(res => {
            setCount(res.data.count)
        })

    // search bar handle
    const handleSearch = (e) => {
        e.preventDefault()
        let search = e.target.search.value
        setSearch(search)
        refetch()
    }

    // sorting value
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // get value of brand 
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        console.log(e.target.value)
        refetch();
    };
    // get value of Category 
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        console.log(e.target.value)
        refetch();
    };

    // get value of Price Range
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

    // All brands
    const uniqueBrands = [...new Set(products.map(product => product.brand))];

    // All Category
    const uniqueCategory = [...new Set(products.map(product => product.category))];
    
    // set par page
    const handleItemsParPage = (e) => {
        const value = parseInt(e.target.value)
        console.log(value)
        setItemsPerPage(value)
        setCurrentPage(0)
    }
    
    // handle previous button 
    const handlePrevPage = () => {
        if(currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    // handle next button
    const handleNextPage = () => {
        if(currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }

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
                                    src={pro.productImage}
                                    alt="Shoes"
                                    className="rounded-xl h-48 object-cover" />
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
            <div className=" flex justify-center gap-3 mt-7">
                <button onClick={handlePrevPage} className="btn flex items-center">
                    <FaLongArrowAltLeft />
                    Prev
                </button>
                {pages.map((page, index) =>
                    <button
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "btn hover:bg-slate-300 bg-blue-500 text-white" : "btn hover:bg-slate-300"} key={index}>
                        {page + 1}
                    </button>)}
                <button onClick={handleNextPage} className="btn flex items-center">
                    Next
                    <FaLongArrowAltRight />
                </button>
                <select value={itemsPerPage} onChange={handleItemsParPage} className="select select-bordered text-gray-500 " name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>

        </div>
    );
};

export default Products;