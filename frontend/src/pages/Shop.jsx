import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  // Get search keyword from URL
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      const filteredProducts = filteredProductsQuery.data?.filter((product) => {
        const matchesPrice = product.price.toString().includes(priceFilter) ||
          product.price === parseInt(priceFilter, 10);
        const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
        const matchesSearch = keyword ? 
          product.name.toLowerCase().includes(keyword.toLowerCase()) : true;
        return matchesPrice && matchesBrand && matchesSearch;
      });

      dispatch(setProducts(filteredProducts || []));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, selectedBrand, keyword]);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined && brand !== null)
      )
    ),
  ];

  return (
    <div className="amazon-bg-light min-h-screen">
      <div className="amazon-container py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full shadow-sm"
          >
            <span className="flex items-center">
              <FaFilter className="mr-2" /> Filters
            </span>
            <span className="text-xs text-gray-500">
              {checked.length > 0 ? `${checked.length} selected` : ""}
            </span>
          </button>

          {/* Filters Sidebar */}
          <div className={`
            ${isFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}
            lg:relative lg:bg-transparent lg:p-0 lg:w-64 flex-shrink-0
          `}>
            {isFilterOpen && (
              <button
                onClick={() => setIsFilterOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={24} />
              </button>
            )}

            <div className="bg-white rounded-md p-4 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Filters</h3>
              
              {/* Categories */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Category</h4>
                {categories?.map((c) => (
                  <label key={c._id} className="flex items-center py-1 hover:bg-gray-50 rounded px-1 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-[#FF9900] rounded border-gray-300 focus:ring-[#FF9900]"
                    />
                    <span className="ml-2 text-sm text-gray-600">{c.name}</span>
                  </label>
                ))}
              </div>

              {/* Brands */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Brand</h4>
                {uniqueBrands?.map((brand) => (
                  <label key={brand} className="flex items-center py-1 hover:bg-gray-50 rounded px-1 cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-[#FF9900] border-gray-300 focus:ring-[#FF9900]"
                    />
                    <span className="ml-2 text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>

              {/* Price */}
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Price</h4>
                <input
                  type="text"
                  placeholder="Enter max price"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full amazon-input text-sm"
                />
              </div>

              {/* Reset */}
              <button
                onClick={() => window.location.reload()}
                className="w-full mt-4 text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-md p-4 shadow-sm border border-gray-200 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Shop</h1>
                  <p className="text-sm text-gray-500">
                    {products?.length || 0} results
                    {keyword && ` for "${keyword}"`}
                  </p>
                </div>
                <select className="amazon-select text-sm">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Avg. Customer Review</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {filteredProductsQuery.isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-md p-4 h-[280px]">
                    <div className="amazon-skeleton h-40 mb-3"></div>
                    <div className="amazon-skeleton h-4 w-3/4 mb-2"></div>
                    <div className="amazon-skeleton h-4 w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products?.length > 0 ? (
                  products.map((p) => (
                    <ProductCard key={p._id} p={p} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-500 bg-white rounded-md">
                    <p className="text-lg">No products found</p>
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;