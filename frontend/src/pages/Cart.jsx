import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaChevronLeft, FaLock } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="amazon-bg-light min-h-screen py-4">
      <div className="amazon-container">
        <Link to="/shop" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm flex items-center mb-4">
          <FaChevronLeft className="mr-1 text-xs" /> Continue Shopping
        </Link>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items */}
          <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-200 p-4">
            <h1 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-4">
              Shopping Cart
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            </h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600">Your cart is empty</p>
                <Link to="/shop" className="text-[#007185] hover:text-[#C7511F] hover:underline mt-2 inline-block">
                  Go to Shop
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="py-4 flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <Link to={`/product/${item._id}`} className="text-sm font-medium text-gray-800 hover:text-[#C7511F]">
                            {item.name}
                          </Link>
                          <div className="text-xs text-[#067D62] mt-1">In Stock</div>
                          <div className="text-xs text-gray-500 mt-1">Eligible for FREE Shipping</div>
                          <div className="flex items-center gap-2 mt-2">
                            <select
                              className="amazon-select text-sm py-1"
                              value={item.qty}
                              onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                            >
                              {[...Array(Math.min(item.countInStock || 10, 10)).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  Qty: {x + 1}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => removeFromCartHandler(item._id)}
                              className="text-[#007185] hover:text-[#C7511F] text-sm hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-[#B12704]">
                            ${(item.qty * item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
                <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
                
                <div className="border-t border-gray-300 my-3 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-[#067D62] font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">${(totalPrice * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-300 mt-2 pt-2">
                    <span>Total:</span>
                    <span>${(parseFloat(totalPrice) + parseFloat(totalPrice) * 0.15).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md py-3 font-medium text-sm transition-colors mt-2"
                  onClick={checkoutHandler}
                >
                  <FaLock className="inline mr-2 text-xs" />
                  Proceed to Checkout
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure transaction. Your information is protected.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;