import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart", {
      position: "bottom-center",
      autoClose: 1500,
    });
  };

  // Calculate rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-[#FFA41C] text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-[#FFA41C] text-sm" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
    }
    return stars;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      {/* Product Image */}
      <Link to={`/product/${p._id}`} className="block relative">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-48 object-contain hover:scale-105 transition-transform duration-200"
        />
        {/* Prime Badge */}
        <span className="absolute top-2 left-2 bg-[#FF9900] text-white text-xs font-bold px-2 py-0.5 rounded">
          Prime
        </span>
      </Link>

      {/* Product Info */}
      <div className="flex-1 mt-3">
        {/* Brand/Name */}
        <Link to={`/product/${p._id}`}>
          <h3 className="text-sm font-medium text-gray-800 hover:text-[#C7511F] line-clamp-2 min-h-[40px]">
            {p.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {renderStars(p.rating || 0)}
          </div>
          <span className="text-xs text-[#007185] ml-2">
            {p.numReviews || 0}
          </span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-xl font-bold text-[#B12704]">
            ${p.price?.toFixed(2) || '0.00'}
          </span>
        </div>

        {/* Shipping Info */}
        <div className="text-xs text-gray-500 mt-1">
          {p.countInStock > 0 ? (
            <>
              <span className="text-[#067D62] font-medium">In Stock</span>
              <span className="mx-1">·</span>
              <span>FREE delivery</span>
            </>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCartHandler(p, 1)}
          disabled={p.countInStock === 0}
          className={`w-full mt-3 py-2 px-4 rounded text-sm font-medium transition-colors ${
            p.countInStock > 0
              ? "bg-[#F0C14B] hover:bg-[#EBB93D] border border-[#A88734]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FaShoppingCart className="inline mr-2" />
          {p.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;