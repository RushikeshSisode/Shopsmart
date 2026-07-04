import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import ProductCard from "./Products/ProductCard";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <>
      <Header />
      <main className="amazon-bg-light min-h-screen">
        <div className="amazon-container py-4">
          {/* Breadcrumb */}
          <div className="text-sm text-[#007185] mb-4">
            <Link to="/" className="hover:text-[#C7511F] hover:underline">Home</Link>
            {keyword && (
              <>
                <span className="text-gray-500 mx-1">›</span>
                <span className="text-gray-700">Search: "{keyword}"</span>
              </>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-md p-4 h-[300px]">
                  <div className="amazon-skeleton h-40 mb-3"></div>
                  <div className="amazon-skeleton h-4 w-3/4 mb-2"></div>
                  <div className="amazon-skeleton h-4 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <Message variant="danger">
              {error?.data?.message || error?.message || "Failed to load products. Please try again."}
            </Message>
          ) : (
            <>
              {/* Featured Section */}
              <div className="bg-white rounded-md p-6 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {keyword ? `Results for "${keyword}"` : "Featured Products"}
                  </h2>
                  <Link to="/shop" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm flex items-center">
                    See all <FaArrowRight className="ml-1 text-xs" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data?.products?.length > 0 ? (
                    data.products.map((product) => (
                      <ProductCard key={product._id} p={product} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                      No products found. Try a different search.
                    </div>
                  )}
                </div>
              </div>

              {/* Deals Section */}
              <div className="bg-white rounded-md p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Deals</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data?.products?.slice(0, 5).map((product) => (
                    <div key={product._id} className="relative">
                      <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-tl-md rounded-br-md">
                        -20%
                      </div>
                      <ProductCard p={product} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;