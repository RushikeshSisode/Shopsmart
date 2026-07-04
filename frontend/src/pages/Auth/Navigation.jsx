import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// ✅ FIXED: Correct import path (../../ instead of ../)
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { 
  FaShoppingCart, 
  FaUser, 
  FaHeart, 
  FaHome, 
  FaStore,
  FaBars,
  FaTimes,
  FaUserCog
} from "react-icons/fa";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      {/* Mobile Bottom Navigation Bar - Amazon Style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#232F3E] text-white shadow-lg">
        <div className="flex items-center justify-around py-2 px-2">
          {/* Home */}
          <Link to="/" className="flex flex-col items-center hover:text-[#FF9900] transition-colors">
            <FaHome className="text-xl" />
            <span className="text-[10px] mt-0.5">Home</span>
          </Link>

          {/* Shop */}
          <Link to="/shop" className="flex flex-col items-center hover:text-[#FF9900] transition-colors">
            <FaStore className="text-xl" />
            <span className="text-[10px] mt-0.5">Shop</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex flex-col items-center hover:text-[#FF9900] transition-colors relative">
            <div className="relative">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF9900] text-black text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">Cart</span>
          </Link>

          {/* Favorites */}
          <Link to="/favorite" className="flex flex-col items-center hover:text-[#FF9900] transition-colors relative">
            <div className="relative">
              <FaHeart className="text-xl" />
              <FavoritesCount />
            </div>
            <span className="text-[10px] mt-0.5">Wishlist</span>
          </Link>

          {/* Menu */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center hover:text-[#FF9900] transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
            <span className="text-[10px] mt-0.5">Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#232F3E] text-white pt-12 px-6 lg:hidden overflow-y-auto">
          {/* Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-[#FF9900]"
          >
            <FaTimes size={24} />
          </button>

          {/* User Info */}
          {userInfo ? (
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FF9900] flex items-center justify-center text-xl font-bold text-black">
                  {userInfo.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-lg">{userInfo.username}</p>
                  <p className="text-sm text-gray-400">{userInfo.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 pb-6 border-b border-gray-700">
              <Link 
                to="/login" 
                className="block w-full amazon-btn-primary text-center py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="block w-full text-center py-2 text-sm text-gray-300 hover:text-white mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Account
              </Link>
            </div>
          )}

          {/* Menu Links */}
          <div className="space-y-2">
            <Link 
              to="/" 
              className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link 
              to="/shop" 
              className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🛍️ Shop
            </Link>
            <Link 
              to="/cart" 
              className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🛒 Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            <Link 
              to="/favorite" 
              className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ❤️ Favorites
            </Link>
            
            {/* Admin Links */}
            {userInfo?.isAdmin && (
              <>
                <div className="border-t border-gray-700 my-3"></div>
                <p className="text-sm text-gray-400 px-4 py-1">Admin Panel</p>
                <Link 
                  to="/admin/dashboard" 
                  className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUserCog className="inline mr-2" /> Dashboard
                </Link>
                <Link 
                  to="/admin/productlist" 
                  className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📦 Products
                </Link>
                <Link 
                  to="/admin/categorylist" 
                  className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🏷️ Categories
                </Link>
                <Link 
                  to="/admin/orderlist" 
                  className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📋 Orders
                </Link>
                <Link 
                  to="/admin/userlist" 
                  className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👥 Users
                </Link>
              </>
            )}

            {/* Profile & Logout */}
            {userInfo && (
              <>
                <div className="border-t border-gray-700 my-3"></div>
                <Link 
                  to="/profile" 
                  className="block py-3 px-4 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👤 Your Profile
                </Link>
                <button 
                  onClick={logoutHandler}
                  className="block w-full text-left py-3 px-4 hover:bg-gray-700 rounded-md transition-colors text-red-400"
                >
                  🚪 Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;