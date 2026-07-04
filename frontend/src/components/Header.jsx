import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { logout } from "../redux/features/auth/authSlice";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?keyword=${searchTerm}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar - Amazon Style */}
      <header className="bg-[#131A22] text-white">
        <div className="amazon-container flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:border-white border border-transparent px-1 py-0.5 rounded">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#FF9900]">M</span>
              <span className="text-white">art</span>
            </span>
            <span className="text-xs text-white/70 ml-0.5">.com</span>
          </Link>

          {/* Delivery Location */}
          <div className="hidden lg:flex items-center hover:border-white border border-transparent px-1 py-0.5 rounded cursor-pointer">
            <div className="text-xs text-gray-300">Deliver to</div>
            <div className="text-sm font-bold flex items-center">
              <FaUser className="mr-1 text-xs" />
              India
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <select className="hidden sm:block h-10 px-2 text-xs bg-gray-100 text-gray-700 border-r border-gray-300 cursor-pointer hover:bg-gray-200">
                <option>All</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Fashion</option>
              </select>
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 h-10 px-3 text-gray-700 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="h-10 px-5 bg-[#FF9900] hover:bg-[#FF8C00] transition-colors"
              >
                <FaSearch className="text-gray-800" />
              </button>
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Language */}
            <div className="hidden lg:flex items-center hover:border-white border border-transparent px-1 py-0.5 rounded cursor-pointer">
              <span className="text-sm">🌐</span>
              <span className="text-xs font-bold ml-0.5">EN</span>
            </div>

            {/* Account */}
            <div className="relative group">
              <div className="flex flex-col items-center hover:border-white border border-transparent px-1 py-0.5 rounded cursor-pointer">
                <span className="text-xs text-gray-300">
                  {userInfo ? `Hello, ${userInfo.username}` : "Hello, Sign in"}
                </span>
                <span className="text-sm font-bold">
                  Account & Lists
                </span>
              </div>
              {userInfo && (
                <div className="absolute right-0 mt-1 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      Your Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      Your Orders
                    </Link>
                    <Link to="/favorite" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      Your Favorites
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Orders */}
            <Link to="/orders" className="hidden lg:flex flex-col items-center hover:border-white border border-transparent px-1 py-0.5 rounded">
              <span className="text-xs text-gray-300">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-center hover:border-white border border-transparent px-1 py-0.5 rounded relative">
              <div className="relative">
                <FaShoppingCart className="text-2xl" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF9900] text-black text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-sm font-bold ml-1">Cart</span>
            </Link>
          </div>
        </div>

        {/* Bottom Nav Bar */}
        <nav className="bg-[#232F3E] border-t border-gray-700">
          <div className="amazon-container flex items-center h-10 space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center hover:border-white border border-transparent px-1 py-0.5 rounded text-sm"
            >
              <FaBars className="mr-1" />
              All
            </button>
            <Link to="/" className="hover:border-white border border-transparent px-1 py-0.5 rounded text-sm">Today's Deals</Link>
            <Link to="/shop" className="hover:border-white border border-transparent px-1 py-0.5 rounded text-sm">Best Sellers</Link>
            <Link to="/shop" className="hover:border-white border border-transparent px-1 py-0.5 rounded text-sm">Electronics</Link>
            <Link to="/shop" className="hover:border-white border border-transparent px-1 py-0.5 rounded text-sm">Fashion</Link>
            <Link to="/shop" className="hover:border-white border border-transparent px-1 py-0.5 rounded text-sm">Books</Link>
            <Link to="/shop" className="hover:border-white border border-transparent px-1 py-0.5 rounded text-sm">Home & Kitchen</Link>
          </div>
        </nav>
      </header>

      {/* Product Carousel */}
      <div className="bg-white shadow-sm">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-10 text-red-600">Error loading products</div>
        ) : (
          <ProductCarousel products={products} />
        )}
      </div>
    </div>
  );
};

export default Header;